using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class InitialCreatee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Usuarios",
                type: "varchar(15)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Usuarios",
                type: "varchar(15)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Usuarios",
                type: "varchar(25)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(25)",
                oldMaxLength: 25);

            migrationBuilder.AlterColumn<string>(
                name: "IdPersona",
                table: "Usuarios",
                type: "varchar(13)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(13)",
                oldMaxLength: 13);

            migrationBuilder.AlterColumn<string>(
                name: "Estado",
                table: "Usuarios",
                type: "varchar(8)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(8)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "Apellidos",
                table: "Usuarios",
                type: "varchar(25)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(25)",
                oldMaxLength: 25);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Usuarios",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Usuarios",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Usuarios",
                type: "varchar(25)",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(25)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "IdPersona",
                table: "Usuarios",
                type: "varchar(13)",
                maxLength: 13,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(13)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Estado",
                table: "Usuarios",
                type: "varchar(8)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(8)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Apellidos",
                table: "Usuarios",
                type: "varchar(25)",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(25)",
                oldNullable: true);
        }
    }
}
