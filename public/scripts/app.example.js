class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driverType = document.getElementById('driverType');
    this.date = document.getElementById('date');
    this.pickupTime = document.getElementById('pickupTime');
    this.passengerCount = document.getElementById('passengerCount');

    this.loadButton.disabled = true;
  }

  async init() {
    await this.load();
    
    this.driverType.onchange = this.handleInputChange;
    this.date.onchange = this.handleInputChange
    this.pickupTime.onchange = this.handleInputChange
    
    this.loadButton.onclick = this.run;
  }
  handleInputChange = () => {
    // Periksa apakah semua input terisi
    const isInputValid = this.driverType.value !== '' && this.date.value !== '' && this.pickupTime.value !== '';

    // Aktifkan tombol jika semua input terisi
    this.loadButton.disabled = !isInputValid;
  };

  filterCars(car) {
    const driver = parseInt(this.driverType.value) === 1;
    const condition1 = car.driverType === driver;
    const condition2 = car.availableAt < new Date(this.date.value);
    const condition3 = this.pickupTime.value ? true : false;
    const condition4 = !this.passengerCount.value || car.capacity === parseInt(this.passengerCount.value);
    console.log(condition3);
    return condition1 && condition2 && condition3 && (!condition3 || condition4);
  }

  run = async () => {
    while (this.carContainerElement.firstChild) {
      this.carContainerElement.innerHTML = '';
    }

    const filteredCars = await Car.list.filter((car) => this.filterCars(car));
    filteredCars.forEach((car) => {
      console.log(car);
        const node = document.createElement("div");
        node.classList = "car-item";
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  // clear = () => {
  //   let child = this.carContainerElement.firstElementChild;

  //   while (child) {
  //     child.remove();
  //     child = this.carContainerElement.firstElementChild;
  //   }
  // };
}
