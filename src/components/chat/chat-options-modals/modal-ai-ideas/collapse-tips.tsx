export default function CollapseTips() {
  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" />
      <div className="collapse-title text-xl font-medium">Tips</div>
      <div className="collapse-content">
        <ul>
          <li className="list-disc ml-2 text-sm my-1">
            <strong>La historia termina a los 3 fallos o 5 éxitos</strong> <br /> Si no quieres que
            termine rápido, puedes escribir tus resultados de pruebas o pedirle a GmAi que las haga
            por ti. Así no se guardarán en el sistema y evitarás que se active el final. Aunque GmAi
            puede concluir por su cuenta, puedes pedirle que continúe hasta donde quieras.
          </li>
          <li className="list-disc ml-2 text-sm my-1">
            <strong>La XP ganada al final de la historia</strong> <br /> Se calcula en base al
            resultado de tus pruebas de característica. Solo las pruebas lanzadas desde las fichas
            de tus personajes cuentan, ya que se registran en el sistema. GmAI lleva su propio
            registro, pero no es muy confiable.
          </li>
          <li className="list-disc ml-2 text-sm my-1">
            <strong>Conseguir una mejor historia</strong> <br /> Es fácil, aporta ideas a la trama
            de manera creativa y no solo eligiendo las opciones que te da GmAi.
          </li>
          <li className="list-disc ml-2 text-sm my-1">
            <strong>Jugar una historia más rápida</strong> <br />
            Es posible, pide a tu GmAi &quot;realizar pruebas de características&quot;, eso lo
            motivará a darte más pruebas y detalles para avanzar más rápido en la historia. Si GmAi
            realiza tiradas por tí, puedes decirle que tú quieres realziar todas las tiradas.
          </li>
          <li className="list-disc ml-2 text-sm my-1">
            <strong>¿Quiers jugar una campaña de varias historias?</strong> <br /> Pide a GmAi un
            resumen de la historia y copia su mensaje. En tu próxima partida puedes decirle
            &quot;Quiero continuar con esta historia: [pega el resumen de la historia aquí]&quot;.
          </li>
        </ul>
      </div>
    </div>
  );
}
