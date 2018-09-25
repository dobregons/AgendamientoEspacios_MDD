/* Scripts página reserva
David Obregón Sánchez
2018 */
//Scripts for autocomplete
$(function () {
  $.widget("custom.combobox", {
    _create: function () {
      this.wrapper = $("<span>")
        .addClass("custom-combobox")
        .insertAfter(this.element);

      this.element.hide();
      this._createAutocomplete();
      this._createShowAllButton();
    },

    _createAutocomplete: function () {
      var selected = this.element.children(":selected"),
        value = selected.val() ? selected.text() : "";

      this.input = $("<input>")
        .appendTo(this.wrapper)
        .val(value)
        .attr("title", "")
        .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: $.proxy(this, "_source")
        })
        .tooltip({
          classes: {
            "ui-tooltip": "ui-state-highlight"
          }
        });

      this._on(this.input, {
        autocompleteselect: function (event, ui) {
          ui.item.option.selected = true;
          this._trigger("select", event, {
            item: ui.item.option
          });
        },

        autocompletechange: "_removeIfInvalid"
      });
    },

    _createShowAllButton: function () {
      var input = this.input,
        wasOpen = false

      $("<a>")
        .attr("tabIndex", -1)
        .attr("title", "Show All Items")
        .attr("height", "")
        .tooltip()
        .appendTo(this.wrapper)
        .button({
          icons: {
            primary: "ui-icon-triangle-1-s"
          },
          text: "false"
        })
        .removeClass("ui-corner-all")
        .addClass("custom-combobox-toggle ui-corner-right")
        .on("mousedown", function () {
          wasOpen = input.autocomplete("widget").is(":visible");
        })
        .on("click", function () {
          input.trigger("focus");

          // Close if already visible
          if (wasOpen) {
            return;
          }

          // Pass empty string as value to search for, displaying all results
          input.autocomplete("search", "");
        });
    },

    _source: function (request, response) {
      var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
      response(this.element.children("option").map(function () {
        var text = $(this).text();
        if (this.value && (!request.term || matcher.test(text)))
          return {
            label: text,
            value: text,
            option: this
          };
      }));
    },

    _removeIfInvalid: function (event, ui) {

      // Selected an item, nothing to do
      if (ui.item) {
        return;
      }

      // Search for a match (case-insensitive)
      var value = this.input.val(),
        valueLowerCase = value.toLowerCase(),
        valid = false;
      this.element.children("option").each(function () {
        if ($(this).text().toLowerCase() === valueLowerCase) {
          this.selected = valid = true;
          return false;
        }
      });

      // Found a match, nothing to do
      if (valid) {
        return;
      }

      // Remove invalid value
      this.input
        .val("")
        .attr("title", value + " didn't match any item")
        .tooltip("open");
      this.element.val("");
      this._delay(function () {
        this.input.tooltip("close").attr("title", "");
      }, 2500);
      this.input.autocomplete("instance").term = "";
    },

    _destroy: function () {
      this.wrapper.remove();
      this.element.show();
    }
  });

  $("#combobox").combobox();
  $("#toggle").on("click", function () {
    $("#combobox").toggle();
  });
});

//custom scripts
$(document).ready(function () {
  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    defaultDate: new Date(),
    defaultView: 'agendaDay',
    events: [
      // {
      //   title: 'event3',
      //   start: '2018-09-10T12:30:00',
      //   allDay: false // will make the time show
      // }
      // etc...
    ],
    color: 'yellow',   // an option!
    textColor: 'black',
    selectable: true,
    eventRender: function (event, element, view) {
      if (view.name == 'listDay') {
        element.find(".fc-list-item-time").append("<span class='closeon'>X</span>");
      } else {
        element.find(".fc-content").prepend("<span class='closeon'>X</span>");
      }
      element.find(".closeon").on('click', function () {
        $.post("reserva/borrarreserva", {
          idreserva: event.id,
        }, function (data) {
          alert(data);
        })
          .fail(function (err) {
            alert(err);
          });
        $('#calendar').fullCalendar('removeEvents', event._id);

        console.log('delete');
      });
    },
    select: function (start, end, event, view) {
      //Función para agregar eventos al calendario cuando se arrastra el mouse
      var momentStart = moment(start).format();
      var momentEnd = moment(end).format();
      var agregar = true;
      //Validar que la disponibilidad no se solape con una existente
      if ($('#calendar').fullCalendar('clientEvents').length > 0) {
        try {
          $('#calendar').fullCalendar('clientEvents').forEach(function (element) {

            var dStartClickable = new Date(momentStart);
            var dEndClickable = new Date(momentEnd);
            var dStart = new Date(moment(element.start).format());
            var dEnd = new Date(moment(element.end).format());

            //Comparación que no se solapen
            if (((dStartClickable <= dStart && dEndClickable <= dStart) || (dStartClickable >= dEnd))) {
              //agregarFechaCalendarioPersistida(momentStart, momentEnd);

            } else {
              //No válido
              alert("La fecha seleccionada se cruza con una disponibilidad existente");
              //agregar = false;
              throw BreakException;
            }
          });
          if (agregar)
            agregarFechaCalendarioPersistida(momentStart, momentEnd, EventType.Disponible);
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      } else {
        agregarFechaCalendarioPersistida(momentStart, momentEnd, EventType.Disponible);
      }




    }
    // an option!
  });

  $('#calendar_reserva').fullCalendar({
    defaultDate: new Date(),
    defaultView: 'agendaDay',
    events: [

    ],
    color: 'yellow',   // an option!
    textColor: 'black',
    selectable: true,
    eventRender: function (event, element, view) {
      if (view.name == 'listDay') {
        element.find(".fc-list-item-time").append("<span class='closeon'>X</span>");
      } else {
        element.find(".fc-content").prepend("<span class='closeon'>X</span>");
      }
      element.find(".closeon").on('click', function () {
        $.post("reserva/borrarreserva", {
          idreserva: event.id,
        }, function (data) {
          //addEventCalendar(data.id, data.detalle, momentStart, momentEnd, tipoEvento)
          //alert("Se ha borrado el registro con id " + event.id);
          alert(data);
        })
          .fail(function (err) {
            alert(err);
          });
        $('#calendar').fullCalendar('removeEvents', event._id);

        console.log('delete');
      });
    },
    select: function (start, end, event, view) {
      //Función para agregar eventos al calendario cuando se arrastra el mouse
      var momentStart = moment(start).format();
      var momentEnd = moment(end).format();
      var agregar = false;
      //Validar que la reserva que se va a realizar este en el límite de las disponibilidades
      if ($('#calendar_reserva').fullCalendar('clientEvents').length > 0) {
        try {
          $('#calendar_reserva').fullCalendar('clientEvents').forEach(function (element) {

            var dStartClickable = new Date(momentStart);
            var dEndClickable = new Date(momentEnd);
            var dStart = new Date(moment(element.start).format());
            var dEnd = new Date(moment(element.end).format());

            //Se debe verificar que la fecha este dentro de los límites de las fechas
            //disponibles, si hay una fecha que cumpla se agrega la reserva
            if (dStart <= dStartClickable && dEndClickable <= dEnd) {
              agregarFechaCalendarioPersistida(momentStart, momentEnd, EventType.Reserva);
              throw BreakException;
            }

          });
          alert("No puedes reservar en el horario seleccionado");
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      } else {
        agregarFechaCalendarioPersistida(momentStart, momentEnd, EventType.Reserva);
      }
    }
  })
  //Acciones que se ejecutan cuando se da click en el botón modificar espacio
  $("#btn-mod-espacio").click(function () {
    var idespacio = $("#combobox").val();
    if (idespacio.trim() == "") {
      alert("Debes seleccionar un espacio");
    } else {
      window.location.href = "/modificarespacio/" + idespacio;
    }
  });
  //Acciones que se ejecutan cuando se da click en el botón borrar espacio
  $("#btn-del-espacio").click(function () {
    var idespacio = $("#combobox").val();
    if (idespacio.trim() == "") {
      alert("Debes seleccionar un espacio");
    } else {
      $.post("coordinador/borrarespacio", {
        idespacio: idespacio,
      }, function (data) {
        alert("Se ha borrado el espacio!");
        location.reload(true);
      })
        .fail(function () {
          alert("Error consultando el servicio");
        });
    }
  });

  var calendar;
  //Acciones que se ejecutan cuando se da click en el  botón consultar
  $("#btn-cons-reserva").click(function () {

    if ($('#calendar').length > 0)
      calendar = $('#calendar');
    else
      calendar = $('#calendar_reserva');
    //Borrar eventos actuales del calendario
    calendar.fullCalendar('removeEvents');
    //Realizar consulta de las reservas para el espacio seleccionado
    var idEspacio = $("#combobox").val();
    $.get("/reserva/consultarreservaporespacio?idespacio=" + idEspacio, function (data) {
      if (data) {
        if (data.length > 0) {
          data.forEach(reserva => {
            //Agregar eventos al calendario
            addEventCalendar(reserva.id, reserva.detalle, reserva.fechainicio, reserva.fechafin, reserva.idestado);
          });
        }
      }
      else
        alert("La consulta falló");

    });
  });
});

var EventType = Object.freeze(
  {
    "Disponible": 1,
    "Reserva": 2,
    "Cambio": 3
  }
);

//Función para agregar eventos al calendario
function addEventCalendar(id, title, start, end, tipoEvento) {
  if ($('#calendar').length > 0)
    calendar = $('#calendar');
  else
    calendar = $('#calendar_reserva');
  var newEvent = new Object();
  newEvent.id = id;
  newEvent.title = title;
  newEvent.start = moment(start).format();
  newEvent.end = moment(end).format();
  newEvent.allDay = false;
  switch (tipoEvento) {
    case EventType.Disponible:
      newEvent.color = 'blue';
      break;
    case EventType.Reserva:
      newEvent.color = 'red';
      break;
    case EventType.Cambio:
      newEvent.color = 'yellow';
  }

  calendar.fullCalendar('renderEvent', newEvent, true);
}

//Borrar evento del calendario por ID
//$('#calendar').fullCalendar('removeEvents', 7);

function agregarFechaCalendarioPersistida(momentStart, momentEnd, tipoEvento) {
  //Válido
  //Enviar información al controlador
  var detalle = prompt('Ingresa el detalle de la reserva');
  switch (tipoEvento) {
    case (EventType.Disponible):
      $.post("espacio/creardisponibilidad", {
        idespacio: $("#combobox").val(),
        fechainicio: momentStart,
        fechafin: momentEnd,
        detalle: detalle
      }, function (data) {
        addEventCalendar(data.id, data.detalle, momentStart, momentEnd, tipoEvento)

        alert("success");
      })
        .fail(function (err) {
          alert("Error consultando el servicio");
        });
      break;
    case (EventType.Reserva):
      $.post("persona/reservarespacio", {
        idespacio: $("#combobox").val(),
        fechainicio: momentStart,
        fechafin: momentEnd,
        detalle: detalle
      }, function (data) {
        addEventCalendar(data.id, data.detalle, momentStart, momentEnd, tipoEvento)
      })
        .fail(function (err) {
          alert("Error consultando el servicio");
        });
      break;
  }

}