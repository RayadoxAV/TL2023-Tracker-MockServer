class ServiceComponent {
  public id: number;
  public nombre: string;
  public state: number = 0;
  public data: any;
  public description: string;
  
  private callback: any;


  // Mock control over what service components are down or interrupted or up
  private isDown: boolean = false;
  private isInterrupted: boolean = false;
  private isUp: boolean = true;

  constructor(id: number, nombre: string, callback: any, description: string) {
    this.id = id;
    this.nombre = nombre;
    this.description = description;
    
    this.callback = callback;
  }

  public serve() {
    this.callback();
    // if (this.isUp) {
    //   this.callback();
    // } else if (this.isInterrupted) {
    //   setTimeout(() => {
    //     this.callback();
    //   }, 5000);
    // } else if (this.isDown) {
    //   // Do nothing
  }

  public getData(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (this.isUp) {
        resolve(this.data);
      } else if (this.isInterrupted) {
        setTimeout(() => {
          resolve(this.data);
        }, 5000);
      } else if (this.isDown) {
        resolve(undefined);
      }
     });

    return promise;
  }
  
  public interrupt() {
    this.isInterrupted = true;
    this.isDown = false;
    this.isUp = false;
    this.state = 1;
  }

  public down() {
    this.isDown = true;
    this.isInterrupted = false;
    this.isUp = false;
    this.state = 2;
  }

  public up() {
    this.isUp = true;
    this.isInterrupted = false;
    this.isDown = false;
    this.state = 0;
  }
}

export default ServiceComponent;
