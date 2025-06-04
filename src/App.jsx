import { useFormHandlers } from "./hooks/useFormHandlers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/css/institucional.css";
import PasoDatosLaborales from "./components/formulario/PasoDatosLaborales";
import PasoMontoYCuotas from "./components/formulario/PasoMontoYCuotas";
import PasoDatosContacto from "./components/formulario/PasoDatosContacto";
import Header from "./components/ui/Header";
import Main from "./components/ui/Main";
import Card from "./components/ui/Card";

// Acá deberíamos definir bien que datos va a necesitar el área de créditos para evaluar la consulta.
const INIT_STATE = {
  situacion: "",
  salario: "",
  banco: "",
  monto: 0,
  cuotas: 1,
  monto_cuota: 0,
  nombre: "",
  email: "",
  telefono: "",
  fecha_nacimiento: "",
  dni: "",
  genero: "",
  tipo_telefono: "",
  provincia: "",
  delegacion: "",
};

const MONTO_MAXIMO_FACTOR = 100; // Esto se vá cuando veamos las reglas de linea de crédito.

function App() {
  const {
    form,
    paso,
    mensajeExito,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
    montoMaximo,
  } = useFormHandlers(INIT_STATE, MONTO_MAXIMO_FACTOR);

  return (
    <>
      <Header />
      <Main>
        <Card>
          {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
          {paso === 1 && (
            <PasoDatosLaborales
              form={form}
              handleChange={handleChange}
              onNext={handleNext}
            />
          )}
          {paso === 2 && (
            <PasoMontoYCuotas
              form={form}
              handleChange={handleChange}
              montoMaximo={montoMaximo}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {paso === 3 && (
            <PasoDatosContacto
              form={form}
              handleChange={handleChange}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </Card>
      </Main>
    </>
  );
}

export default App;
