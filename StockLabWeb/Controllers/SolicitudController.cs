using System;
using System.Linq;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLabWeb.Models;

namespace StockLabWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    {

        private readonly SolicitudService _service;
        public SolicitudController(StockLabContext context)
        {
            _service = new SolicitudService(context);
        }
        // POST: api/Solicitud
        [HttpPost]
        public ActionResult<SolicitudViewModel> Post(SolicitudInputModel solicitudInputModel)
        {
            Solicitud solicitud = MapearSolicitud(solicitudInputModel);
            var response = _service.GuardarSolicitud(solicitud);
            if (response.Error)
            {
                ModelState.AddModelError("Error al guardar la solicitud", response.Mensaje);
                var detallesproblemas = new ValidationProblemDetails(ModelState);

                detallesproblemas.Status = StatusCodes.Status500InternalServerError;
                return BadRequest(detallesproblemas);
            }
            return Ok(response.Solicitud);
        }

        //api/Solicitud
        [HttpGet]
        public ActionResult<SolicitudViewModel> Gets()
        {
            var response = _service.ConsultarSolicitudes();

            if (response.Error)
            {
                ModelState.AddModelError("Error al Consutar las solicitudes", response.Mensaje);
                var detallesproblemas = new ValidationProblemDetails(ModelState);

                detallesproblemas.Status = StatusCodes.Status500InternalServerError;
                return BadRequest(detallesproblemas);
            }
            return Ok(response.Solicitudes.Select(a => new SolicitudViewModel(a)));
        }

        // GET: api/Persona/5​
        [HttpGet("{numero}")]
        public ActionResult<SolicitudViewModel> Get(string numero)
        {
            var response = _service.BuscarSolicitud(numero);

            if (response.Error)
            {
                ModelState.AddModelError("Error al Consutar las solicitudes", response.Mensaje);
                var detallesproblemas = new ValidationProblemDetails(ModelState);

                if(response.Mensaje == "No existe")
                {
                    detallesproblemas.Status = StatusCodes.Status404NotFound;
                }
                else
                {
                    detallesproblemas.Status = StatusCodes.Status500InternalServerError;
                }
                return BadRequest(detallesproblemas);
            }
            return Ok(new SolicitudViewModel(response.Solicitud));
        }





        private Solicitud MapearSolicitud(SolicitudInputModel solicitudInput)
        {
            var solicitud = new Solicitud
            {
                Fecha = DateTime.Parse(solicitudInput.Fecha),
                Estado = solicitudInput.Estado,
                CodigoAsignatura = solicitudInput.Asignatura.Codigo,
                IdPersona = solicitudInput.IdPersona,
                Detalles = solicitudInput.Detalles,
                SolicitudFecha = DateTime.Now,
                Hora = solicitudInput.Hora,
                Monitor = solicitudInput.Monitor
            };
            return solicitud;
        }
    }
}