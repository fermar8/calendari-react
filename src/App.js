import React from 'react';
import { useState, useEffect } from 'react';
import { Caixa, Header, Button, Body, Dia } from './components/styles';


function App() {
  //Número de dies segons si es un any normal o de traspàs
  const dies = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const diesBis = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //Nom dies setmana i mesos
  const diesSetmana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const mesos = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  //Dia d'avui i estat de data canviant
  const avui = new Date();
  const [data, setData] = useState(avui);
  const [dia, setDia] = useState(data.getDate());
  const [mes, setMes] = useState(data.getMonth());
  const [any, setAny] = useState(data.getFullYear());
  //Definint el primer dia del mes
  const [diaInici, setDiaInici] = useState(getPrimerDiaMes(data));

  useEffect(() => {
  //Cada cop que es refresca o s'actualitza la pàgina es defineix la data
  // i el primer dia del mes
    setDia(data.getDate());
    setMes(data.getMonth());
    setAny(data.getFullYear());
    setDiaInici(getPrimerDiaMes(data));
  }, [data]);

  //Funció que defineix el primer dia del mes
  function getPrimerDiaMes(data) {
    //si la l'inici del mes es 0, dona 7 (des del principi) i sino
    //dona el valor de la data d'inici
    const dataInici = new Date(data.getFullYear(), data.getMonth(), 1).getDay();
    return dataInici === 0 ? 7 : dataInici;
  }

  //funció que defineix si un any es de traspàs
  function esBis(any) {
    return (any % 4 === 0 && any % 100 !== 0) || any % 400 === 0;
  }

  //si es de traspàs fem servir diesBis, sinó fem servir dies.
  const normalOBis = esBis(data.getFullYear()) ? diesBis : dies;

  return (
    <Caixa>
      <Header>
    {/*Sumem o restem un mes segons si cliquem anterior o següent*/}
        <Button onClick={() => setData(new Date(any, mes - 1, dia))}>Ant</Button>
        <div>
          {mesos[mes]} {any}
        </div>
        <Button onClick={() => setData(new Date(any, mes + 1, dia))}>Sig</Button>
      </Header>
      <Body>
      {/*Posem els dies de la setmana*/}
        {diesSetmana.map((d) => (
          <Dia key={d}>
            <strong>{d}</strong>
          </Dia>
        ))}
        {/*Array(array a fer servir[index del mes] Ex: normalObis[mes] + 4 - 1 = 34).fill(null) omple l'inici de l'array mes 
        amb el número que li passem de diaInici amb null, farem servir els index de l'array amb nulls pels dies. 
        El map fa Ex: index (0) - diaInici (4) - 2 = -2 i comenca a mapejar l'array fins el final (34-2 = 32, però el 0 no conta així que 31). 
        [-2, -1, 0, (comensa a comptar) 1, 2, etc...3] Si dia és més gran que 0 pinta d, sino pinta ''*/}
        {/*Fem un map dels dies i passem props per styled-components css
         si dia(d) és més petit que 0 tornem '' */}
        {Array(normalOBis[mes] + (diaInici - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (diaInici - 2);
            {console.log('ddia', d)
             console.log('mmes', mes)}   
            return (
              <Dia
                key={index}
                esAvui={d === avui.getDate()}
                estaSeleccionat={d === dia}
                onClick={() => setData(new Date(any, mes, d))}
              >
                {d > 0 ? d : ''}
              </Dia>
            );
          })}
      </Body>
    </Caixa>
  );
}

export default App;