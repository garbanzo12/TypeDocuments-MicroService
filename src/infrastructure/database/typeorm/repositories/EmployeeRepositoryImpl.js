import { Employee } from '../../../../domain/entities/Employee.js';

export class EmployeeRepositoryImpl {
  constructor(pool) {
    this.pool = pool;
  }

  // 🔥 Obtener todos los empleados
  async findAll() {
    const result = await this.pool
      .request()
      .query(`
        SELECT 
          Id,
          DocumentNumber,
          DocumentType,
          FullName,
          Gender,
          MaritalStatus,
          DateOfBirth,
          PlaceOfBirth,
          Phone1,
          Phone2,
          Address,
          Email,
          Post,
          CompanyId,
          EmployeeType,
          OfficeId,
          Asset,
          DateOfEntry,
          CompletionDate,
          FirsName,
          LastName,
          CauseWithdrawal,
          TypeOfContract,
          IdCecoName
        FROM dbo.Employees
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Employee({
          Id: row.Id,
          DocumentNumber: row.DocumentNumber,
          DocumentType: row.DocumentType,
          FullName: row.FullName,
          Gender: row.Gender,
          MaritalStatus: row.MaritalStatus,
          DateOfBirth: row.DateOfBirth,
          PlaceOfBirth: row.PlaceOfBirth,
          Phone1: row.Phone1,
          Phone2: row.Phone2,
          Address: row.Address,
          Email: row.Email,
          Post: row.Post,
          CompanyId: row.CompanyId,
          EmployeeType: row.EmployeeType,
          OfficeId: row.OfficeId,
          Asset: row.Asset,
          DateOfEntry: row.DateOfEntry,
          CompletionDate: row.CompletionDate,
          FirsName: row.FirsName,
          LastName: row.LastName,
          CauseWithdrawal: row.CauseWithdrawal,
          TypeOfContract: row.TypeOfContract,
          IdCecoName: row.IdCecoName,
        })
    );
  }

  // 🔥 Buscar empleado por Id
  async findById(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`
        SELECT 
          Id,
          DocumentNumber,
          DocumentType,
          FullName,
          Gender,
          MaritalStatus,
          DateOfBirth,
          PlaceOfBirth,
          Phone1,
          Phone2,
          Address,
          Email,
          Post,
          CompanyId,
          EmployeeType,
          OfficeId,
          Asset,
          DateOfEntry,
          CompletionDate,
          FirsName,
          LastName,
          CauseWithdrawal,
          TypeOfContract,
          IdCecoName
        FROM dbo.Employees
        WHERE Id = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Employee({
      Id: row.Id,
      DocumentNumber: row.DocumentNumber,
      DocumentType: row.DocumentType,
      FullName: row.FullName,
      Gender: row.Gender,
      MaritalStatus: row.MaritalStatus,
      DateOfBirth: row.DateOfBirth,
      PlaceOfBirth: row.PlaceOfBirth,
      Phone1: row.Phone1,
      Phone2: row.Phone2,
      Address: row.Address,
      Email: row.Email,
      Post: row.Post,
      CompanyId: row.CompanyId,
      EmployeeType: row.EmployeeType,
      OfficeId: row.OfficeId,
      Asset: row.Asset,
      DateOfEntry: row.DateOfEntry,
      CompletionDate: row.CompletionDate,
      FirsName: row.FirsName,
      LastName: row.LastName,
      CauseWithdrawal: row.CauseWithdrawal,
      TypeOfContract: row.TypeOfContract,
      IdCecoName: row.IdCecoName,
    });
  }
}
