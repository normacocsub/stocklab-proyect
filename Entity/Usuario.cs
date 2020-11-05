using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Usuario
    {
        [Key]
        [Column(TypeName = "varchar(30)")]
        [Required(ErrorMessage = "Debe ingresar un correo")]
        [DataType(DataType.EmailAddress,ErrorMessage = "Debe ser un email valido")]
        public string User { get; set; }
        [Column(TypeName = "varchar(15)")]
        [Required(ErrorMessage = "Debe ingresar una contraseña")]
        [RegularExpression("(?=.*[-!#$%&/()?¡_])(?=.*[A-Z])(?=.*[a-z]).{8,}", ErrorMessage = "Contraseña invalida")]
        [StringLength(15, ErrorMessage = "Contraseña demasiado larga")]
        public string Password { get; set; }
        [Column(TypeName = "varchar(25)")]
        [Required(ErrorMessage = "Debe ingresar un nombre")]
        [StringLength(25, ErrorMessage = "nombre demasiado largo")]
        public string Nombre { get; set; }
        [Column(TypeName = "varchar(25)")]
        [Required(ErrorMessage = "Debe ingresar un apellido")]
        [StringLength(25, ErrorMessage = "apellido demasiado largo")]
        public string Apellidos { get; set; }
        [Column(TypeName = "varchar(15)")]
        [Required(ErrorMessage = "Debe ingresar un tipo")]
        [StringLength(15, ErrorMessage = "tipo demasiado largo")]
        public string Tipo { get; set; }
        [NotMapped]
        public string Token { get; set; }
        [Column(TypeName = "varchar(8)")]
        [Required(ErrorMessage = "Debe ingresar un estado")]
        [StringLength(15, ErrorMessage = "estado demasiado largo")]
        public string Estado { get; set; }
        [Column(TypeName = "varchar(13)")]
        [Required(ErrorMessage = "Proporcione la identificacion")]
        [StringLength(13, ErrorMessage = "La identificacion es muy larga")]
        public string IdPersona { get; set; }
    }
}
