'use client';
import React, { useState, useEffect } from 'react';
import '../style/planet.css';

function Page() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🔹 Fetch kérés a backendhez
    fetch('http://devsite.monvoie.com/api/planet')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlanets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching planets:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔹 Bolygó információ lekérése név alapján (magyar nevekkel)
  const getPlanetInfo = (planetName: string) => {
    const planet = planets.find(
      (p) => p.name.toLowerCase() === planetName.toLowerCase()
    );
    return planet ? planet.information : '';
  };

  // 🔹 Ha hiba történt, jelezzük
  if (error) {
    return <div className="error">Hiba történt: {error}</div>;
  }

  // 🔹 Amíg az adatok betöltődnek, mutassunk egy töltésjelzőt
  if (loading) {
    return <div className="loading">Adatok betöltése...</div>;
  }


  return (
    <div>
      {/* Menü rész – a bolygók kiválasztása */}
      <input className="planet9" id="pluto" name="planet" type="radio" />
      <label className="pluto menu" htmlFor="pluto">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Plutó
          </h2>
          <h3>39.5 AU</h3>
        </div>
      </label>
      <input className="planet8" id="neptune" name="planet" type="radio" />
      <label className="neptune menu" htmlFor="neptune">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Neptunusz
          </h2>
          <h3>30.06 AU</h3>
        </div>
      </label>
      <input className="planet7" id="uranus" name="planet" type="radio" />
      <label className="uranus menu" htmlFor="uranus">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Uránusz
          </h2>
          <h3>19.18 AU</h3>
        </div>
      </label>
      <input className="planet6" id="saturn" name="planet" type="radio" />
      <label className="saturn menu" htmlFor="saturn">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Szaturnusz
          </h2>
          <h3>9.539 AU</h3>
        </div>
      </label>
      <input className="planet5" id="jupiter" name="planet" type="radio" />
      <label className="jupiter menu" htmlFor="jupiter">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Jupiter
          </h2>
          <h3>5.203 AU</h3>
        </div>
      </label>
      <input defaultChecked={true} className="planet4" id="mars" name="planet" type="radio" />
      <label className="menu mars" htmlFor="mars">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Mars
          </h2>
          <h3>1.524 AU</h3>
        </div>
      </label>
      <input defaultChecked={true} className="planet3" id="earth" name="planet" type="radio" />
      <label className="menu earth" htmlFor="earth">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Föld
          </h2>
          <h3>1 AU</h3>
        </div>
      </label>
      <input defaultChecked={true} className="planet2" id="venus" name="planet" type="radio" />
      <label className="menu venus" htmlFor="venus">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Vénusz
          </h2>
          <h3>0.723 AU</h3>
        </div>
      </label>
      <input defaultChecked={true} className="planet1" id="mercury" name="planet" type="radio" />
      <label className="menu mercury" htmlFor="mercury">
        <div className="preview" />
        <div className="info">
          <h2>
            <div className="pip" />
            Merkúr
          </h2>
          <h3>0.39 AU</h3>
        </div>
      </label>

      {/* Felső, kis információs részek (a menüben) */}
      <div className="solar">
        <div className="solar_systm">
          <div className="planet mercury">
            <div className="planet_description mercury">
              <h2>Bolygó</h2>
              <h1>Merkúr</h1>
              <p>{getPlanetInfo("Merkúr") || "Betöltés Merkúr infó..."}</p>
              <label htmlFor="readMercury">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet venus">
            <div className="planet_description venus">
              <h2>Bolygó</h2>
              <h1>Vénusz</h1>
              <p>{getPlanetInfo("Vénusz") || "Betöltés Vénusz infó..."}</p>
              <label htmlFor="readVenus">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet earth">
            <div className="moon moon">
              <h3>Hold</h3>
              <h2>Hold</h2>
            </div>
            <div className="trajectory m" />
            <div className="planet_description earth">
              <h2>Bolygó</h2>
              <h1>Föld</h1>
              <p>{getPlanetInfo("Föld") || "Betöltés Föld infó..."}</p>
              <label htmlFor="readEarth">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet mars">
            <div className="moon deimos">
              <h3>Hold</h3>
              <h2>Deimos</h2>
            </div>
            <div className="trajectory d" />
            <div className="moon phoebos">
              <h3>Hold</h3>
              <h2>Phoebos</h2>
            </div>
            <div className="trajectory p" />
            <div className="planet_description mars">
              <h2>Bolygó</h2>
              <h1>Mars</h1>
              <p>{getPlanetInfo("Mars") || "Betöltés Mars infó..."}</p>
              <label htmlFor="readMars">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet jupiter">
            <div className="moon lo">
              <h3>Hold</h3>
              <h2>Io</h2>
            </div>
            <div className="moon europa">
              <h3>Hold</h3>
              <h2>Europa</h2>
            </div>
            <div className="moon ganymede">
              <h3>Hold</h3>
              <h2>Ganymede</h2>
            </div>
            <div className="trajectory lop" />
            <div className="trajectory eu" />
            <div className="trajectory ga" />
            <div className="planet_description jupiter">
              <h2>Bolygó</h2>
              <h1>Jupiter</h1>
              <p>{getPlanetInfo("Jupiter") || "Betöltés Jupiter infó..."}</p>
              <label htmlFor="readJupiter">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet saturn">
            <div className="moon titan">
              <h3>Hold</h3>
              <h2>Titan</h2>
            </div>
            <div className="moon dione">
              <h3>Hold</h3>
              <h2>Dione</h2>
            </div>
            <div className="moon enceladus">
              <h3>Hold</h3>
              <h2>Enceladus</h2>
            </div>
            <div className="trajectory ti" />
            <div className="trajectory di" />
            <div className="trajectory enc" />
            <div className="planet_description saturn">
              <h2>Bolygó</h2>
              <h1>Szaturnusz</h1>
              <p>{getPlanetInfo("Szaturnusz") || "Betöltés Szaturusz infó..."}</p>
              <label htmlFor="readSaturn">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet uranus">
            <div className="moon miranda">
              <h3>Moon</h3>
              <h2>Miranda</h2>
            </div>
            <div className="moon ariel">
              <h3>Hold</h3>
              <h2>Ariel</h2>
            </div>
            <div className="moon umbriel">
              <h3>Hold</h3>
              <h2>Umbriel</h2>
            </div>
            <div className="trajectory mir" />
            <div className="trajectory ari" />
            <div className="trajectory umb" />
            <div className="planet_description uranus">
              <h2>Bolygó</h2>
              <h1>Uránusz</h1>
              <p>{getPlanetInfo("Uránusz") || "Betöltés Uránusz infó..."}</p>
              <label htmlFor="readUranus">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet neptune">
            <div className="moon triton">
              <h3>Hold</h3>
              <h2>Triton</h2>
            </div>
            <div className="moon proteus">
              <h3>Hold</h3>
              <h2>Proteus</h2>
            </div>
            <div className="moon nereid">
              <h3>Hold</h3>
              <h2>Nereid</h2>
            </div>
            <div className="trajectory tri" />
            <div className="trajectory pro" />
            <div className="trajectory ner" />
            <div className="planet_description neptune">
              <h2>Bolygó</h2>
              <h1>Neptunusz</h1>
              <p>{getPlanetInfo("Neptunusz") || "Betöltés Neptunusz infó..."}</p>
              <label htmlFor="readNeptune">
                <a>
                Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
        <div className="solar_systm">
          <div className="planet pluto">
            <div className="planet_description pluto">
              <h2>Bolygó</h2>
              <h1>Plutó</h1>
              <p>{getPlanetInfo("Plutó") || "Betöltés Plutó infó..."}</p>
              <label htmlFor="readPluto">
                <a>
                  Olvass tovább<span></span>
                </a>
              </label>
            </div>
            <div className="overlay" />
          </div>
        </div>
      </div>

      {/* Alsó, nagy panelok – itt szintén a backendről érkező információt jelenítjük meg */}
      <input className="read" id="readMercury" name="mercuryRead" type="radio" />
      <label className="closeBig" htmlFor="closeMercury" />
      <input className="read" id="closeMercury" name="mercuryRead" type="radio" />
      <div className="panel">
        <h1>Merkúr</h1>
        <p>{getPlanetInfo("Merkúr") || "Betöltés Merkúr infó..."}</p>
        <img
          src="https://i2.wp.com/www.astronomytrek.com/wp-content/uploads/2012/11/mercury-1.jpg?fit=678%2C381&ssl=1"
          alt="Mercury"
        />
      </div>

      <input className="read" id="readVenus" name="venusRead" type="radio" />
      <label className="closeBig" htmlFor="closeVenus" />
      <input className="read" id="closeVenus" name="venusRead" type="radio" />
      <div className="panel">
        <h1>Venus</h1>
        <p>{getPlanetInfo("Vénusz") || "Betöltés Vénusz infó..."}</p>
        <img
          src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2014/2-whatistheave.jpg"
          alt="Venus"
        />
      </div>

      <input className="read" id="readEarth" name="earthRead" type="radio" />
      <label className="closeBig" htmlFor="closeEarth" />
      <input className="read" id="closeEarth" name="earthRead" type="radio" />
      <div className="panel">
        <h1>Föld</h1>
        <p>{getPlanetInfo("Föld") || "Betöltés Föld infó..."}</p>
        <img
          src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350"
          alt="Earth"
        />
      </div>

      <input className="read" id="readMars" name="marsRead" type="radio" />
      <label className="closeBig" htmlFor="closeMars" />
      <input className="read" id="closeMars" name="marsRead" type="radio" />
      <div className="panel">
        <h1>Mars</h1>
        <p>{getPlanetInfo("Mars") || "Betöltés Mars infó..."}</p>
        <img
          src="https://1.bp.blogspot.com/-ou7Je3OVg6U/WYtxDqjNp_I/AAAAAAAACSQ/fsopS5VtFg4bmlv8hQNfiRYfJqTygCotQCLcBGAs/s2048/Martian%2Blandscape%2Bby%2BAmante%2BLombardi.jpg"
          alt="Mars"
        />
      </div>

      <input className="read" id="readJupiter" name="jupiterRead" type="radio" />
      <label className="closeBig" htmlFor="closeJupiter" />
      <input className="read" id="closeJupiter" name="jupiterRead" type="radio" />
      <div className="panel">
        <h1>Jupiter</h1>
        <p>{getPlanetInfo("Jupiter") || "Betöltés Jupiter infó..."}</p>
        <img
          src="http://hanaleikauaivacation.com/wp-content/uploads/parser/jupiter-landscape-1.jpg"
          alt="Jupiter"
        />
      </div>

      <input className="read" id="readSaturn" name="saturnRead" type="radio" />
      <label className="closeBig" htmlFor="closeSaturn" />
      <input className="read" id="closeSaturn" name="saturnRead" type="radio" />
      <div className="panel">
        <h1>Szaturnusz</h1>
        <p>{getPlanetInfo("Szaturnusz") || "Betöltés Szaturnusz infó..."}</p>
        <img
          src="http://ak0.picdn.net/shutterstock/videos/4049260/thumb/1.jpg"
          alt="Saturn"
        />
      </div>

      <input className="read" id="readUranus" name="uranusRead" type="radio" />
      <label className="closeBig" htmlFor="closeUranus" />
      <input className="read" id="closeUranus" name="uranusRead" type="radio" />
      <div className="panel">
        <h1>Uránusz</h1>
        <p>{getPlanetInfo("Uránusz") || "Betöltés Uránusz infó..."}</p>
        <img
          src="http://www.cosmosup.com/wp-content/uploads/2016/02/Uranus-Facts-About-the-Planet-Uranus-700x325.jpg"
          alt="Uranus"
        />
      </div>

      <input className="read" id="readNeptune" name="neptuneRead" type="radio" />
      <label className="closeBig" htmlFor="closeNeptune" />
      <input className="read" id="closeNeptune" name="neptuneRead" type="radio" />
      <div className="panel">
        <h1>Neptunusz</h1>
        <p>{getPlanetInfo("Neptunusz") || "Betöltés Neptunusz infó..."}</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8Dd14tbXAzh1iz-EJl9tulRwH7Bb-SxX6sXpKFDbqb-NKwpE"
          alt="Neptune"
        />
      </div>

      <input className="read" id="readPluto" name="plutoRead" type="radio" />
      <label className="closeBig" htmlFor="closePluto" />
      <input className="read" id="closePluto" name="plutoRead" type="radio" />
      <div className="panel">
        <h1>Plutó</h1>
        <p>{getPlanetInfo("Plutó") || "Betöltés Plutó infó..."}</p>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/asd.jpeg"
          alt="Pluto"
        />
      </div>
    </div>
  );
}

export default Page;
