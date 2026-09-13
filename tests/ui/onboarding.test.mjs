import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { webcrypto } from 'node:crypto';

const html = readFileSync(new URL('../../ui/profile_setup.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const bundle = readFileSync(new URL('../../ui/astromatch_runtime.bundle.js', import.meta.url), 'utf8');

function setup({ stored, natalFails = false } = {}) {
  const nodes = new Map();
  function element(id) {
    const classes = new Set();
    return { id, value: '', checked: false, disabled: false, textContent: '', children: [], attributes: {},
      handlers: {}, classList: { add: x => classes.add(x), remove: x => classes.delete(x),
        toggle: (x, yes) => yes ? classes.add(x) : classes.delete(x), contains: x => classes.has(x) },
      addEventListener(type, cb) { this.handlers[type] = cb; },
      appendChild(child) { this.children.push(child); },
      setAttribute(key, val) { this.attributes[key] = val; }
    };
  }
  for (const [, id] of html.matchAll(/id="([^"]+)"/g)) nodes.set(id, element(id));
  const data = new Map(stored ? [['astromatch:profiles', JSON.stringify(stored)]] : []);
  const context = vm.createContext({ console, Date, Intl, crypto: webcrypto, setTimeout, clearTimeout,
    localStorage: { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v), removeItem: k => data.delete(k) },
    location: { replace: url => { context.destination = url; } },
    document: { getElementById: id => nodes.get(id), createElement: () => element(''),
      querySelector: () => null,
      querySelectorAll: selector => selector === '.month' ? nodes.get('monthButtons').children :
        ['welcomeScreen','profileScreen','revealScreen'].map(id => nodes.get(id)) }
  });
  context.window = context;
  context.scrollTo = () => {};
  context.AstroMatchPlaceAutocomplete = { install() {}, async resolve() {} };
  vm.runInContext(bundle, context);
  if (natalFails) context.AstroMatchRuntime = { natal: async () => { throw new Error('Calcul interrompu'); } };
  vm.runInContext(script, context);
  const set = (id, value) => { nodes.get(id).value = value; };
  async function submit({ day = '12', month = 3, year = '1990', unknown = false } = {}) {
    set('primaryFirstName', 'Test');set('primaryDay',day);set('primaryYear',year);
    nodes.get('monthButtons').children[month].handlers.click();
    set('primaryTime','14:35'); nodes.get('primaryTimeUnknown').checked=unknown;
    nodes.get('primaryTimeUnknown').handlers.change();
    set('primaryPlace','Toulouse, France');set('primaryLatitude','43.6047');set('primaryLongitude','1.4442');set('primaryTimezone','Europe/Paris');
    await nodes.get('primaryForm').handlers.submit({ preventDefault() {} });
  }
  return { nodes, context, data, submit };
}

test('onboarding: crée uniquement le principal et affiche le vrai thème', async () => {
  const app=setup();await app.submit();
  const profiles=JSON.parse(app.data.get('astromatch:profiles'));
  assert.equal(profiles.length,1);assert.equal(profiles[0].role,'primary');
  assert.equal(profiles[0].birth_data.date,'1990-04-12');
  assert.equal(app.nodes.get('sunValue').textContent,'Bélier');
  assert.notEqual(app.nodes.get('ascValue').textContent,'—');
  assert.equal(app.nodes.get('revealScreen').classList.contains('active'),true);
  const resumed=setup({stored:profiles});assert.equal(resumed.context.destination,'./match_result.html');
});
test('onboarding: heure inconnue sans ascendant inventé', async () => {
  const app=setup();await app.submit({unknown:true});
  assert.equal(app.nodes.get('ascValue').textContent,'Heure inconnue');
  assert.equal(JSON.parse(app.data.get('astromatch:profiles'))[0].birth_data.time.known,false);
});
test('onboarding: date impossible refusée sans profil enregistré', async () => {
  const app=setup();await app.submit({day:'31',month:1});
  assert.equal(app.data.has('astromatch:profiles'),false);
  assert.equal(app.nodes.get('formError').classList.contains('show'),true);
});
test('onboarding: échec du calcul sans enregistrement ni faux succès', async () => {
  const app=setup({natalFails:true});await app.submit();
  assert.equal(app.data.has('astromatch:profiles'),false);
  assert.equal(app.nodes.get('formError').textContent,'Calcul interrompu');
  assert.equal(app.nodes.get('saveButton').disabled,false);
});
