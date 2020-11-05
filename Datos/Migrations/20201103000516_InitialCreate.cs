using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Asignaturas",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false),
                    Nombre = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Horario = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asignaturas", x => x.Codigo);
                });

            migrationBuilder.CreateTable(
                name: "Insumos",
                columns: table => new
                {
                    Item = table.Column<string>(type: "varchar(5)", maxLength: 4, nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    Marca = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insumos", x => x.Item);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    User = table.Column<string>(type: "varchar(30)", nullable: false),
                    Password = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    Nombre = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Apellidos = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Tipo = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    Estado = table.Column<string>(type: "varchar(8)", maxLength: 15, nullable: false),
                    IdPersona = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.User);
                });

            migrationBuilder.CreateTable(
                name: "Personas",
                columns: table => new
                {
                    Identificacion = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: false),
                    Nombre = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Apellidos = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    Correo = table.Column<string>(type: "varchar(30)", nullable: true),
                    Edad = table.Column<int>(type: "int", nullable: false),
                    Sexo = table.Column<string>(type: "varchar(11)", maxLength: 11, nullable: true),
                    UsuarioUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personas", x => x.Identificacion);
                    table.ForeignKey(
                        name: "FK_Personas_Usuarios_UsuarioUser",
                        column: x => x.UsuarioUser,
                        principalTable: "Usuarios",
                        principalColumn: "User",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Solicitudes",
                columns: table => new
                {
                    Numero = table.Column<string>(type: "varchar(5)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaEntrega = table.Column<DateTime>(type: "datetime", nullable: false),
                    Estado = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true),
                    Hora = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Monitor = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false),
                    CantidadInsumos = table.Column<int>(type: "int", nullable: false),
                    CodigoAsignatura = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false),
                    IdPersona = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: false),
                    SolicitudFecha = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solicitudes", x => x.Numero);
                    table.ForeignKey(
                        name: "FK_Solicitudes_Asignaturas_CodigoAsignatura",
                        column: x => x.CodigoAsignatura,
                        principalTable: "Asignaturas",
                        principalColumn: "Codigo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Solicitudes_Personas_IdPersona",
                        column: x => x.IdPersona,
                        principalTable: "Personas",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleInsumo",
                columns: table => new
                {
                    NumeroDetalle = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: false),
                    Fecha = table.Column<string>(type: "varchar(20)", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    CodigoInsumo = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false),
                    SolicitudNumero = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleInsumo", x => x.NumeroDetalle);
                    table.ForeignKey(
                        name: "FK_DetalleInsumo_Insumos_CodigoInsumo",
                        column: x => x.CodigoInsumo,
                        principalTable: "Insumos",
                        principalColumn: "Item",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleInsumo_Solicitudes_SolicitudNumero",
                        column: x => x.SolicitudNumero,
                        principalTable: "Solicitudes",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetalleInsumo_CodigoInsumo",
                table: "DetalleInsumo",
                column: "CodigoInsumo");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleInsumo_SolicitudNumero",
                table: "DetalleInsumo",
                column: "SolicitudNumero");

            migrationBuilder.CreateIndex(
                name: "IX_Personas_UsuarioUser",
                table: "Personas",
                column: "UsuarioUser");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitudes_CodigoAsignatura",
                table: "Solicitudes",
                column: "CodigoAsignatura");

            migrationBuilder.CreateIndex(
                name: "IX_Solicitudes_IdPersona",
                table: "Solicitudes",
                column: "IdPersona");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleInsumo");

            migrationBuilder.DropTable(
                name: "Insumos");

            migrationBuilder.DropTable(
                name: "Solicitudes");

            migrationBuilder.DropTable(
                name: "Asignaturas");

            migrationBuilder.DropTable(
                name: "Personas");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
