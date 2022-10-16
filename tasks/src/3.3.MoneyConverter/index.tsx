import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './styles.css';
import {number} from "prop-types";

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

const MoneyConverter: React.FC = () => {
  const [rubles, setRubles] = useState(0);
  const [euros, setEuros] = useState(0);
  const updateRublesValue = (newRubles: number) => {
    setRubles(newRubles);
    setEuros(newRubles / RUBLES_IN_ONE_EURO);
  };
  const updateEurosValue = (newEuros: number) => {
    setRubles(newEuros * RUBLES_IN_ONE_EURO);
    setEuros(newEuros);
  };
  return (
    <div className="root">
      <div className="form">
        <h2>Конвертер валют</h2>
        <div>
          <span>&#8381;</span>
          <Money value={rubles} setValue={updateRublesValue}/>
          &mdash;
          <Money value={euros} setValue={updateEurosValue}/>
          <span>&euro;</span>
        </div>
      </div>
    </div>
  );
};

type MoneyProps = {
  value: number;
  setValue: (value: number) => void;
};

const Money: React.FC<MoneyProps> = ({ value, setValue }) => {
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = extractNumberString(event.target.value);
    setValue(value);
  };

  return <input type="text" value={value} onChange={handleChangeValue} />;
};

function extractNumberString(value: string): number {
  const str = value.replace(/^0+/g, '').replace(/[^.0-9]/g, '');
  const parts = str.split('.');
  return Number(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str);
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
 */
