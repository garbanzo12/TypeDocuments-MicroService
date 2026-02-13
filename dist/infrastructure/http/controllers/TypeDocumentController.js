function _classPrivateFieldLooseBase(e, t) { if (!{}.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance"); return e; }
var id = 0;
function _classPrivateFieldLooseKey(e) { return "__private_" + id++ + "_" + e; }
import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)
var _log = /*#__PURE__*/_classPrivateFieldLooseKey("log");
export class TypeDocumentController {
  constructor(getTypeDocumentUseCase, getTypeDocumentByIdUseCase) {
    // Este es un helper para centralizar el formato del log
    Object.defineProperty(this, _log, {
      value: _log2
    });
    /* Ejemplos de este log
      ([hora] [icono] [Tipo petición] [endpoint] - [Respuesta] )
      pendiente
    */
    this.getAll = async (req, res) => {
      try {
        const typedocuments = await this.getTypeDocumentUseCase.execute();
        if (!typedocuments || typedocuments.length === 0) {
          _classPrivateFieldLooseBase(this, _log)[_log]('error', 'GET /typedocument - No se encontraron registros');
          return res.status(404).json({
            message: "typedocuments not found"
          });
        }
        _classPrivateFieldLooseBase(this, _log)[_log]('success', 'GET /typedocument - Petición exitosa', {
          count: typedocuments.length
        });
        res.json(typedocuments);
      } catch (error) {
        _classPrivateFieldLooseBase(this, _log)[_log]('error', 'GET /typedocument - Error crítico', error.message);
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
    };
    this.getById = async (req, res) => {
      const {
        id
      } = req.params;
      try {
        const typedocument = await this.getTypeDocumentByIdUseCase.execute(id);
        if (!typedocument) {
          _classPrivateFieldLooseBase(this, _log)[_log]('error', `GET /typedocument/${id} - No encontrado`);
          return res.status(404).json({
            message: "typedocument not found"
          });
        }
        _classPrivateFieldLooseBase(this, _log)[_log]('success', `GET /typedocument/${id} - Petición exitosa`);
        res.json(typedocument);
      } catch (error) {
        _classPrivateFieldLooseBase(this, _log)[_log]('error', `GET /typedocument/${id} - Error`, error.message);
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
    };
    this.getTypeDocumentUseCase = getTypeDocumentUseCase;
    this.getTypeDocumentByIdUseCase = getTypeDocumentByIdUseCase;
  }
}
function _log2(type, message, data = '') {
  const time = new Date().toLocaleTimeString();
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }; // Iconos para exito (✅), error (❌) e info (ℹ️)
  const colors = {
    success: pc.green,
    error: pc.red,
    info: pc.blue
  }; // Los colores son verdes(200), para petición exitosa, rojo para petición fallida(400-500), azul para info (100)

  console.log(`${pc.gray(`[${time}]`)} ${colors[type](icons[type])} ${pc.bold(message)}`, data ? pc.dim(JSON.stringify(data)) : '' // La salida del log se veria asi ([hora] [icono] [Tipo petición] [endpoint] - [Respuesta] )
  );
}