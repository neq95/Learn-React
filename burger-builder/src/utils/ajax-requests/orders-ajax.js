class OrdersAjax {
  #baseUrl = "https://burger-builder-14199.firebaseio.com";

  #subscribes = [];

  postData = async(url, body) => {
    let resultUrl = new URL(url, this.#baseUrl);

    return await fetch(resultUrl, {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      if(!response.ok) throw new Error(`Network error: ${response.status}. Please, try again later`);
      return response.json();
    }).catch((err) => {
      this._trigger(err);
      return new Promise((resolve, reject) => reject());
    })
  }

  getData = async(url) => {
    let resultUrl = new URL(url, this.#baseUrl);

    return await fetch(resultUrl)
      .then(response => {
        if(!response.ok) throw new Error(`Can't get data from server`);
        return response.json();
      }).catch((err) => {
        this._trigger(err);
        return new Promise((resolve, reject) => reject());
      });
  }

  deleteData = async(url) => {
    let resultUrl = new URL(url, this.#baseUrl);

    return await fetch(resultUrl, {
      method: "DELETE"
    }).then(response => {
      if(!response.ok) throw new Error(`Can't delete data from server`);
      return response.json();
    }).catch(err => {
      this._trigger(err);
      return err;
    })
  }

  getSubsc = () => {
    return this.#subscribes;
  }

  on = (handler) => {
    this.#subscribes.push(handler);
    return this.#subscribes.length - 1;
  }

  off = (index) => {
    this.#subscribes.splice(index, 1);
  }

  _trigger(value) {
    this.#subscribes.forEach(el => el(value))
  }
}

let ordersAjax = new OrdersAjax();

export default ordersAjax;