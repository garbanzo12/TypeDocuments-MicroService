import { TypeDocument } from '../../../../domain/entities/TypeDocument.js';
export class TypeDocumentRepositoryImpl {
  constructor(pool) {
    this.pool = pool;
  }

  // 🔥 Obtener todos los empleados
  async findAll() {
    const result = await this.pool.request().query(`
        SELECT 
        Id,
        TypeDocument
        ,Nomenclature
        ,State
        ,Father
        ,CreatAt
        FROM dbo.TypeDocuments
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(row => new TypeDocument({
      Id: row.Id,
      TypeDocument: row.TypeDocument,
      Nomenclature: row.Nomenclature,
      State: row.State,
      Father: row.Father,
      CreatAt: row.CreatAt
    }));
  }

  // 🔥 Buscar empleado por Id
  async findById(id) {
    const result = await this.pool.request().input("id", id).query(`
        SELECT 
        Id,
        TypeDocument
        ,Nomenclature
        ,State
        ,Father
        ,CreatAt
        FROM dbo.TypeDocuments
        WHERE Id = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;
    const row = result.recordset[0];
    return new TypeDocument({
      Id: row.Id,
      TypeDocument: row.TypeDocument,
      Nomenclature: row.Nomenclature,
      State: row.State,
      Father: row.Father,
      CreatAt: row.CreatAt
    });
  }
}