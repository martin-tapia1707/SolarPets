import "./Mainsite.css";
import hero from "../assets/hero-mascotas.jpg";
import patita from "../assets/patita.png";
import mascota1 from "../assets/mascota-1.jpg";
import mascota2 from "../assets/mascota-2.jpg";
import mascota3 from "../assets/mascota-3.jpg";
import mascota4 from "../assets/mascota-4.jpg";

const FOTOS = [
  { src: mascota1, alt: "Perra blanca con una ropita rosa" },
  { src: mascota2, alt: "Gato atigrado sacando la lengua" },
  { src: mascota3, alt: "Cachorro shar pei" },
  { src: mascota4, alt: "Gato naranja" },
];

const SERVICIOS = [
  {
    titulo: "Clínica Veterinaria",
    texto: "Atención médica general para el control, diagnóstico y tratamiento de diversas patologías en mascotas.",
  },
  {
    titulo: "Peluquería",
    texto: "Servicios de higiene y estética adaptadas a las necesidades de cada mascota.",
  },
  {
    titulo: "Tienda",
    texto: "Espacio de venta de alimentos y juguetes aptos para el cuidado de tu mascota.",
  },
  {
    titulo: "Adopción",
    texto: "Animales rescatados en busca de una familia.",
  },
];

export default function Mainsite() {
  return (
    <main className="home">
      <section className="home-hero">
        <img className="home-hero-img" src={hero} alt="Un perro y un gato juntos" />
        <span className="home-badge">C.A.B.A. - LAVALLE 3571</span>
        <h1 className="home-hero-title">Todo lo que tu mascota necesita, en un solo lugar</h1>
      </section>

      <div className="home-contenido">
        <ul className="home-fotos">
          {FOTOS.map(({ src, alt }) => (
            <li key={src}>
              <img src={src} alt={alt} />
            </li>
          ))}
        </ul>

        <section className="home-info">
          <h2 className="home-titulo">Quiénes somos...</h2>
          <p>
            En SolarPets brindamos atención veterinaria y servicio de peluquería. Nuestro compromiso es
            cuidar la salud y el bienestar de cada mascota con profesionalismo, dedicación y un trato
            cercano tanto para los animales como para sus familias.
          </p>
          <p>
            Contamos con un equipo capacitado y equipamiento adecuado para ofrecer diagnósticos precisos,
            tratamientos efectivos y servicios preventivos que contribuyen a una mejor calidad de vida
            para perros y gatos.
          </p>
        </section>

        <section className="home-servicios">
          <h2 className="home-titulo">Servicios</h2>
          <ul className="home-cards">
            {SERVICIOS.map(({ titulo, texto }) => (
              <li key={titulo} className="home-card">
                <img src={patita} alt="" />
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
