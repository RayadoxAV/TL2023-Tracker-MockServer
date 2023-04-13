import ServiceComponent from "./serviceComponent";

class Service {
  public id: number;
  public nombre: string;
  public components: ServiceComponent[];
  public state: number;
  public data: any;
  public description: string;

  private isDown: boolean = false;
  private isInterrupted: boolean = false;
  private isUp: boolean = true;


  constructor(id: number, nombre: string, components: ServiceComponent[], state: number, description: string) {
    this.id = id;
    this.nombre = nombre;
    this.components = components;
    this.state = state;
    this.description = description;
  }

  public addComponent(component: ServiceComponent) {
    this.components.push(component);
  }

  public serve() {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i].serve();
    }
  }

}

export default Service;
