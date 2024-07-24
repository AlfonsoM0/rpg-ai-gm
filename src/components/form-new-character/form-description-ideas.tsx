import { Icon } from 'components/icons';

export const appearanceIdeas = [
  '¿Es humano?',
  '¿Cuál es su aspecto más llamativo?',
  '¿Cómo es su forma de vestir?',
  '¿Qué detalles distintivos posee?',
  '¿Cuáles son sus accesorios?',
];
export const backgroundIdeas = [
  '¿Cuál es su historia?',
  '¿Qué le sucedió en su vida?',
  '¿De dónde proviene?',
  '¿Tiene algún secreto?',
  '¿Tiene enemigos?',
];

export const professionIdeas = [
  '¿Qué hace para ganarse la vida?',
  '¿Cuál es o fue su trabajo más importante?',
  '¿Cuáles son sus conocimientos y habilidades?',
  '¿Cómo perciben otras personas su profesión?',
  '¿Es conocido en su rubro?',
];

export const personalityIdeas = [
  '¿Cuáles son su valores?',
  '¿Tiene un carácter fuerte o débil?',
  '¿Cómo se relaciona con los demás?',
  '¿Es amable o desagradable?',
  '¿Tiene un gran sentido del humor?',
  '¿Es independiente o necesita apoyo de otros?',
];

export const equipmentIdeas = [
  '¿Posee algún objeto que lo identifique?',
  '¿Qué objetos posee que le ayuden en su vida cotidiana?',
  '¿Posee algún objeto que le ayude a resolver problemas?',
  '¿Lleva alguna herramienta o instrumento en particular?',
  '¿Cómo se relaciona con sus objetos personales?',
];

export const powersIdeas = [
  '¿Posee algún poder sobrenatural? ¿Qué tipo de poder es?',
  '¿Cómo se relaciona con su poder sobrenatural?',
  '¿Qué problemas puede solucionar con su poder sobrenatural?',
  '¿Cómo utiliza su poder sobrenatural en su vida cotidiana?',
  '¿Posee alguna debilidad especial con respecto a su poder sobrenatural?',
];

export default function DescriptionIdeas({ ideas }: { ideas: string[] }) {
  return (
    <details className="dropdown dropdown-left">
      <summary className="btn btn-xs btn-ghost">
        <Icon.Idea className="w-4 h-4 stroke-info" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {ideas.map((idea, i) => (
          <li key={i}>
            <p>{idea}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
