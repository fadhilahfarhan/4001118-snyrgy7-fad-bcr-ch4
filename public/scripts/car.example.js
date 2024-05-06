class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    driverType,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.driverType = driverType;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
            <div class="car-image">
              <img src="${this.image}" alt="car" />
            </div>
            <div class="car-detail">
              <p>${this.type}</p>
              <p class="bold">Rp ${this.rentPerDay.toLocaleString('id-ID')} / hari</p>
              <p>
                ${this.description}
              </p>
              <div class="car-detail-wraper">
                <img src="./assets/icons/user.svg" alt="" />
                <p>${this.capacity} orang</p>
              </div>
              <div class="car-detail-wraper">
                <img src="./assets/icons/settings.svg" alt="" />
                <p>${this.transmission}</p>
              </div>
              <div class="car-detail-wraper">
                <img src="./assets/icons/calendar.svg" alt="" />
                <p>Tahun ${this.year}</p>
              </div>
            </div>
            <button>Pilih Mobil</button>
    `;
  }
}
