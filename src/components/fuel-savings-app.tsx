/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import FuelSavingsResults from './fuel-savings-results';
import FuelSavingsTextInput from './fuel-savings-text-input';
import {IApplicationState} from '../reducers/fuel-savings';
import {IActions} from '../containers/App';

export interface IFuelSavingsAppProps {
  actions: IActions;
  fuelSavingsAppState: IApplicationState;
};

const FuelSavingsApp = (props: IFuelSavingsAppProps): JSX.Element => {
  const save = function () {
    props.actions.saveFuelSavings(props.fuelSavingsAppState);
  };

  const onTimeframeChange: React.EventHandler<React.FormEvent> = function (e: React.FormEvent): void {
    props.actions.calculateFuelSavings(props, 'kilometersDrivenTimeframe', (e.target as HTMLInputElement).value);
  };

  const fuelSavingsKeypress = function (name: string, value): void {
    props.actions.calculateFuelSavings(props, name, value);
  };

  const settings = props.fuelSavingsAppState;

  return (
    <div>
      <h2>Fuel Savings Analysis</h2>
      <table>
        <tbody>
        <tr>
          <td><label htmlFor='newKpl'>New Vehicle KPL</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='newKpl' value={settings.newKpl} /></td>
        </tr>
        <tr>
          <td><label htmlFor='tradeKpl'>Trade-in KPL</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='tradeKpl' value={settings.tradeKpl} /></td>
        </tr>
        <tr>
          <td><label htmlFor='newPpg'>New Vehicle price per liter</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='newPpg' value={settings.newPpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='tradePpg'>Trade-in price per liter</label></td>
          <td><FuelSavingsTextInput onChange={fuelSavingsKeypress} name='tradePpg' value={settings.tradePpg} /></td>
        </tr>
        <tr>
          <td><label htmlFor='kilometersDriven'>kilometers Driven</label></td>
          <td>
            <FuelSavingsTextInput onChange={fuelSavingsKeypress} name='kilometersDriven' value={settings.kilometersDriven} /> kilometers per
            <select name='kilometersDrivenTimeframe' onChange={onTimeframeChange} value={settings.kilometersDrivenTimeframe}>
              <option value='week'>Week</option>
              <option value='month'>Month</option>
              <option value='year'>Year</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label>Date Modified</label></td>
          <td>{settings.dateModified}</td>
        </tr>
        </tbody>
      </table>

      <hr/>

      {settings.necessaryDataIsProvidedToCalculateSavings ? <FuelSavingsResults savings={settings.savings} /> : null}
      <input type='submit' value='Save' onClick={save} />
    </div>
  );
};

export default FuelSavingsApp;
