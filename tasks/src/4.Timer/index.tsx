<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
=======
import React from 'react';
>>>>>>> parent of 62202a3 (Переделала практику по жизненным циклам, добавила ссылку на демо с функциональными компонентами)
import ReactDom from 'react-dom';
import './styles.css';

/**
    1. Допиши TimeDisplay так, чтобы он показывал текущее время пользователя и сам обновляется каждую секунду.
    2. Пусть при каждом обновлении времени в консоль пишется сообщение:
          console.log('tick');
    3. Позаботься об освобождении ресурсов в случае удаления элемента.
       Убедись, что если компонент скрыть кнопкой, то в консоль не будут писаться тики.
 */

type TimerState = {
  timeVisible: boolean;
};

<<<<<<< HEAD
const TimeDisplay: React.FC = () => {
  const [localTime, setLocalTime] = useState(new Date());
  const clock = useRef<number | null>();
  useEffect(() => {
    clock.current = window.setInterval(() => {
      console.log('tick');
      setLocalTime(new Date());
    }, 1000);
    return () => {
      console.log('unmount');
      window.clearInterval(Number(clock.current));
    };
  }, []);
  return <div className="time">{localTime.toLocaleTimeString()}</div>;
=======
class Timer extends React.Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);
    this.state = { timeVisible: true };
  }

  render() {
    const { timeVisible } = this.state;
    return (
      <div className="page">
        <input
          className="button"
          type="button"
          value={timeVisible ? 'Скрыть' : 'Показать'}
          onClick={() => {
            this.setState({ timeVisible: !timeVisible });
          }}
        />
        {this.state.timeVisible && <TimeDisplay />}
      </div>
    );
  }
}

type TimeDisplayState = {
  localTime: Date;
>>>>>>> parent of 62202a3 (Переделала практику по жизненным циклам, добавила ссылку на демо с функциональными компонентами)
};

class TimeDisplay extends React.Component<{}, TimeDisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      localTime: new Date()
    };
  }

  render() {
    return <div className="time">{this.state.localTime.toLocaleTimeString()}</div>;
  }
}

ReactDom.render(<Timer />, document.getElementById('app'));

/**
    Подсказки:
    - Функция window.setInterval регистрирует обработчик handler,
      который будет вызываться не чаще, чем в заданное количество миллисекунд.
      Оформляется так:
          const intervalId = window.setInterval(handler, intervalInMilliseconds);
    - intervalId можно передать в функцию clearInterval, чтобы остановить вызов обработчика:
          window.clearInterval(intervalId);
    - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
    - componentDidMount вызывается сразу после того, как компонент размещен на странице.
      В нем можно делать запросы на получение данных или подписываться на события.
    - componentWillUnmount вызывается перед тем как удалить компонент.
      Гарантированно вызовется, если элемент «did mount». Отличное место, чтобы освобождать ресурсы.
 */
