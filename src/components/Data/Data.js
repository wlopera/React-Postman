const data = {
  token: {
    method: "POST",
    url: "http://localhost:4446/joc/api/security/login",
    request: null,
    response: "",
    headers: "",
    show: true,
  },
  getJob: {
    method: "POST",
    url: "http://localhost:4446/joc/api/jobscheduler/commands",
    request:
      '<jobscheduler_commands jobschedulerId="LAPTOP-OLQF0MB3_40444"> <show_job job="/service-ol/service-ccb/service"/> </jobscheduler_commands>',
    response: "",
    headers: "",
    show: false,
  },
};

class Data {
  getDataByItem = (item) => {
    if (item === "Token") {
      return {
        method: data.token.method,
        url: data.token.url,
        request: data.token.request,
        response: data.token.response,
        headers: data.token.headers,
      };
    }
    if (item === "Consultar JOB") {
      return {
        method: data.getJob.method,
        url: data.getJob.url,
        request: data.getJob.request,
        response: data.getJob.response,
        headers: data.getJob.headers,
      };
    }
  };

  handleDataChange(item, el, field) {
    if (item === "Token") {
      if (field) {
        data.token[field.name] = field.value;
      } else {
        data.token[el.target.name] = el.target.value;
      }
    } else {
      if (item === "Consultar JOB") {
        if (field) {
          data.getJob[field.name] = field.value;
        } else {
          data.getJob[el.target.name] = el.target.value;
        }
      }
    }
  }
}

export default new Data();
