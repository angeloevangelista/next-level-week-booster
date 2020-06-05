import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import apiEcoleta from '../../services/apiEcoleta';
import apiIBGE from '../../services/apiIBGE';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number,
  title: string,
  image_url: string,
}

interface IBGEUFResponse {
  id: number,
  sigla: string,
}

interface IBGECityResponse {
  id: number,
  nome: string,
}

interface UF {
  id: number,
  initial: string,
}

interface City {
  id: number,
  name: string,
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [ufs, setUfs] = useState<UF[]>([]);

  const [cities, setCities] = useState<City[]>([]);

  const [selectedUf, setSelectedUf] = useState(0);

  const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    apiEcoleta.get('items').then(({ data: items }) => {
      setItems(items);
    });
  }, []);

  useEffect(() => {
    apiIBGE
      .get<IBGEUFResponse[]>(
        'estados?orderBy=nome').then(({ data: ufs }
        ) => {
          const initials = ufs.map(uf => ({
            id: uf.id,
            initial: uf.sigla,
          }));

          setUfs(initials);
        });
  }, [selectedUf]);

  useEffect(() => {
    apiIBGE
      .get<IBGECityResponse[]>(
        `estados/${selectedUf}/municipios?orderBy=nome`).then(({ data: citiesResponse }
        ) => {
          const cities = citiesResponse.map(city => ({
            id: city.id,
            name: city.nome,
          }));

          setCities(cities);
        });
  }, [selectedUf]);

  const handleSelectUF = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value: uf } = e.target;

    setSelectedUf(Number(uf));
  }

  const handleSelectCity = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value: city } = e.target;

    setSelectedCity(Number(city));
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para a home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="name">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecionne o endereço no mapa</span>
          </legend>

          <Map center={[-24.0083135, -46.5066368]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-24.0083135, -46.5066368]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUF}
              >
                <option value="0">Selecione uma UF</option>

                {ufs.map(uf => (
                  <option key={uf.id} value={uf.id}>{uf.initial}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                disabled={selectedUf === 0}
              >
                <option value="0">Selecione uma cidade</option>

                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecionne um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;