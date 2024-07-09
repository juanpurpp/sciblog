export default function Page() {
  return (
    <div className="bg-purple p-8 w-full">
      <div className="flex flex-row">
        <h1 className="text-5xl justify-start font-bold mb-6 w-full">Preguntas frecuentes</h1>
        
      </div>
      
      
      <div className="space-y-4 w-full">
        <details className="p-4 rounded w-full bg-purpura">
          <summary className="text-xl font-semibold cursor-pointer w-full ">¿Cómo puedo comentar un foro</summary>
          <p className="pt-2 w-full ">
            Se puede comentar un foro seleccionando el tema del foro,y hacer clic en comentar, luego rellenar los datos que se soliciten
          </p>
        </details>
        <details className="p-4 bg-purpura rounded">
          <summary className="text-xl font-semibold cursor-pointer">¿Cómo puedo crear un tema en el foro?</summary>
          <p className="pt-2">
            Para crear un tema debe dirigirse al apartado de foros, y hacer clic en el boton Agregar Nuevo Tema, luego rellenar los datos que se soliciten
            </p>
        </details>
        <details className="p-4 bg-purpura rounded">
          <summary className="text-xl font-semibold cursor-pointer">¿Cómo puedo crear una publicación?</summary>
          <p className="pt-2">
            Para crear una publicación se debe estar en el inicio de la red social. Puede ir al inicio haciendo clic a la izquierda en la opción de inicio, luego hacer clic en el botón Nueva Publicación y rellenar los datos que se soliciten
          </p>
        </details>
        <details className="p-4 bg-purpura rounded">
          <summary className="text-xl font-semibold cursor-pointer">¿Cómo puedo cerrar sesión?</summary>
          <p className="pt-2">
            Para cerrar sesión, solo tienes que dirigirte a la opción de la derecha, arriba, y hacer clic en Cerrar Sesión.
          </p>
        </details>
      </div>
    </div>
  )
}

