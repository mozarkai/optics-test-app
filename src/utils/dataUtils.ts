/**
 * dataUtils — dynamic data generators used across all card screens.
 * No hardcoded content in screens — everything comes from here.
 */

const WORDS = [
  'alpha','beta','gamma','delta','epsilon','zeta','eta','theta','iota','kappa',
  'lambda','mu','nu','xi','omicron','pi','rho','sigma','tau','upsilon',
  'apple','binary','cache','debug','echo','firewall','gateway','hash',
  'interface','java','kernel','loop','module','node','object','protocol',
  'queue','router','server','token','unicode','vector','widget','xml','yaml','zip',
];

const COLORS = [
  'hsl(210,70%,82%)','hsl(150,65%,80%)','hsl(30,75%,82%)',
  'hsl(280,60%,82%)','hsl(0,65%,82%)','hsl(60,70%,80%)',
  'hsl(180,60%,80%)','hsl(320,60%,82%)','hsl(90,60%,80%)',
];

export const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
export const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
export const randomId = () => Math.random().toString(36).slice(2, 9);

export const generateListItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: randomId(),
    text: `${randomWord()} ${i + 1}`,
    color: randomColor(),
  }));

export const generateWords = (count: number): string[] =>
  Array.from({ length: count }, () => randomWord());

export const randomDelay = (min = 500, max = 3000) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
