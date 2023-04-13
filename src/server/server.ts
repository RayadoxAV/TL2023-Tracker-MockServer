import express from 'express';
import { createServer, Server } from 'http';
import Service from '../data/service';
import ServiceComponent from '../data/serviceComponent';

class MockServer {
  public count: number = 0
  private static _instance: MockServer;

  public app: express.Application;
  public port: number;

  private httpServer: Server;

  public services: Service[] = [];

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.httpServer = createServer(this.app);
  }

  public static get instance(): MockServer {
    return this._instance || (this._instance = new this());
  }

  public startServer(callback: any): void {
    this.httpServer.listen(this.port, callback);

    const hr = new Service(1, 'HR', [], 0, 'Services related to the Human Resources Department');
    const hrCrit1 = new ServiceComponent(1, 'HR Critical Service 1', () => {
      setInterval(() => {
        hrCrit1.data += 2;

      }, 1000);
    }, 'Description');
    hrCrit1.data = 0;

    const hrCrit2 = new ServiceComponent(2, 'HR Critical Service 2', () => {

    }, 'Description');
    hrCrit2.data = 0;

    const hrCrit3 = new ServiceComponent(3, 'HR Critical Service 3', () => {

    }, 'Description');
    hrCrit3.data = 0;

    const hrCrit4 = new ServiceComponent(4, 'HR Critical Service 4', () => {

    }, 'Description');
    hrCrit4.data = 0;
    const hrCrit5 = new ServiceComponent(5, 'HR Critical Service 5', () => {

    }, 'Description');
    hrCrit5.data = 0;
    hrCrit5.interrupt();
  
    hr.addComponent(hrCrit1);
    hr.addComponent(hrCrit2);
    hr.addComponent(hrCrit3);
    hr.addComponent(hrCrit4);
    hr.addComponent(hrCrit5);

    hr.serve();

    const finance = new Service(2, 'Finance', [], 0, 'All services related to finance and accounting');
    const financeCrit1 = new ServiceComponent(1, 'Finance Critical Service 1', () => {
      setInterval(() => {
        financeCrit1.data += 1;
      }, 1000);
    }, 'Description');
    financeCrit1.data = 0;
    financeCrit1.down();

    const financeCrit2 = new ServiceComponent(1, 'Finance Critical Service 2', () => {
      
    }, 'Description');

    const financeCrit3 = new ServiceComponent(1, 'Finance Critical Service 3', () => {
      
    }, 'Description');

    const financeCrit4 = new ServiceComponent(1, 'Finance Critical Service 4', () => {
      
    }, 'Description');

    const financeCrit5 = new ServiceComponent(1, 'Finance Critical Service 5', () => {
      
    }, 'Description');

    finance.addComponent(financeCrit1);
    finance.addComponent(financeCrit2);
    finance.addComponent(financeCrit3);
    finance.addComponent(financeCrit4);
    finance.addComponent(financeCrit5);
    
    financeCrit4.data = 1;
    financeCrit4.up();

    finance.serve();

    const dev = new Service(3, 'Dev', [], 0, 'The state of the development deparment and its critical services');
    const devCrit1 = new ServiceComponent(1, 'Dev Critical Service 1', () => {}, 'Description');
    const devCrit2 = new ServiceComponent(2, 'Dev Critical Service 2', () => {}, 'Description');
    const devCrit3 = new ServiceComponent(3, 'Dev Critical Service 3', () => {}, 'Description');
    const devCrit4 = new ServiceComponent(4, 'Dev Critical Service 4', () => {}, 'Description');
    const devCrit5 = new ServiceComponent(5, 'Dev Critical Service 5', () => {}, 'Description');
    const devCrit6 = new ServiceComponent(6, 'Dev Critical Service 6', () => {}, 'Description');
    const devCrit7 = new ServiceComponent(7, 'Dev Critical Service 7', () => {}, 'Description');

    devCrit1.data = 0;
    devCrit2.data = 0;
    devCrit3.data = 0;
    devCrit4.data = 0;
    devCrit5.data = 0;
    devCrit6.data = 0;
    devCrit7.data = 0;

    dev.addComponent(devCrit1);
    dev.addComponent(devCrit2);
    dev.addComponent(devCrit3);
    dev.addComponent(devCrit4);
    dev.addComponent(devCrit5);
    dev.addComponent(devCrit6);
    dev.addComponent(devCrit7);
    dev.serve();

    const research = new Service(4, 'Research', [], 0, 'Lorem ipsum dolor sit amet');
    const researchCrit1 = new ServiceComponent(1, 'Research Critical Service 1', () => {}, 'Description');
    const researchCrit2 = new ServiceComponent(2, 'Research Critical Service 2', () => {}, 'Description');
    const researchCrit3 = new ServiceComponent(3, 'Research Critical Service 3', () => {}, 'Description');
    const researchCrit4 = new ServiceComponent(4, 'Research Critical Service 4', () => {}, 'Description');

    researchCrit1.data = 1;
    researchCrit2.data = 1;
    researchCrit3.data = 1;
    researchCrit4.data = 1;

    research.addComponent(researchCrit1);
    research.addComponent(researchCrit2);
    research.addComponent(researchCrit3);
    research.addComponent(researchCrit4);
    research.serve();

    const operation = new Service(5, 'Operation', [], 0, 'Lorem ipsum dolor sit amet');
    const operationCrit1 = new ServiceComponent(1, 'Operation Critical Service 1', () => {}, 'Description');
    const operationCrit2 = new ServiceComponent(2, 'Operation Critical Service 2', () => {}, 'Description');
    const operationCrit3 = new ServiceComponent(3, 'Operation Critical Service 3', () => {}, 'Description');

    operationCrit1.data = 1;
    operationCrit2.data = 1;
    operationCrit3.data = 1;

    operation.addComponent(operationCrit1);
    operation.addComponent(operationCrit2);
    operation.addComponent(operationCrit3);

    operation.serve();

    this.services.push(hr, finance, dev, research, operation);
  }

  public getServices(): Object[] {
    const tempServices: Object[] = [];

    for (let i = 0; i < this.services.length; i++) {
      const service = this.services[i];
      const tempService = {
        id: service.id,
        name: service.nombre,
        description: service.description,
        components: [] as Object[],
        state: service.state
      };
      for (let j = 0; j < this.services[i].components.length; j++) {
        const component = service.components[j];
        const tempComponent = {
          id: component.id,
          name: component.nombre,
          description: component.description,
          state: component.state
        };
        tempService.components.push(tempComponent);
      }

      tempServices.push(tempService);
    }

    return tempServices;
  }

  public async pingAll() {
    const data = [];


    for (let i = 0; i < this.services.length; i++) {
      const service = this.services[i];

      data.push({
        name: service.nombre,
        components: [] as any[]
      })
      for (let j = 0; j < this.services[i].components.length; j++) {
        const component = this.services[i].components[j];

        const startTime = Date.now();
        const data = await component.getData();
        const timeSpent = (Date.now() - startTime);
        
        data[i].components.push({
          id: component.id,
          name: component.nombre,
          data,
          requestTime: timeSpent 
        });
      }
    }

    return data;
  }

  public async pingService(serviceId: number) {
    let service = undefined;
    for (let i = 0; i < this.services.length; i++) {
      if (serviceId === this.services[i].id) {
        service = this.services[i];
        break;
      }
    }

    if (service) {
      const data = [] as any[];
      for (let i = 0; i < service.components.length; i++) {
        const component = service.components[i];

        const startTime = Date.now();
        const serviceData = await component.getData();
        const timeSpent = (Date.now() - startTime);
        data.push({
          id: component.id,
          name: component.nombre,
          data: serviceData,
          requestTime: timeSpent
        });
      }
      return data;
    } else {
      return undefined;
    }
  }
};

export default MockServer;
