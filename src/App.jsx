
import './App.css'

function App() {
  
  const handlerSubmit = (text) => {

  };

  return (
    <>
      <div>
            <div>
                <h2>AdultWork</h2>
                <textarea
                  class="tex"
                  name="adult"
                  id="adults"
                  cols="100"
                  rows="15"
                  placeholder="
                Pege aqui el o los cortes de AdultWork
                Funcionalidad completa cortes listos trabajando en parciales 60% completo"
                ></textarea>
                <div>
                  <button>CORTE</button>
                  <button>PARCIAL</button>
                </div>
            </div>
            <div>
                <table>
                </table>
              <div><button>ENVIAR</button></div>
              <div><button></button></div>
            </div>
          </div>
    </>
  )
}

export default App
