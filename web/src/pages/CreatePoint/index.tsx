import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { Link, useHistory } from 'react-router-dom';

import { UF, City, Item, FormData, IBGECityResponse, IBGEUFResponse } from '../../interfaces';

import apiEcoleta from '../../services/apiEcoleta';
import apiIBGE from '../../services/apiIBGE';

import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/apiEcoleta';

const CreatePoint = () => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [ufs, setUfs] = useState<UF[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState(0);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  const [finisehd, setFinished] = useState(false);

  const history = useHistory();

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handleSelectUF = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value: uf } = e.target;

    setSelectedUf(uf);
  }

  const handleSelectCity = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value: city } = e.target;

    setSelectedCity(Number(city));
  }

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { latlng } = e;

    setSelectedPosition([latlng.lat, latlng.lng]);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSelectItem = (itemId: number) => {
    const indexItem = selectedItems.indexOf(itemId);

    if (indexItem === -1)
      return setSelectedItems([...selectedItems, itemId]);

    const filteredItems = selectedItems.filter(item => item !== itemId);

    setSelectedItems(filteredItems);
  }

  const handleSuccess = () => {

  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    }

    await api.post('points', data);

    setFinished(true);

    setTimeout(() => history.push('/'), 2000);
  }

  return (
    <>
      {finisehd ? (
        <div id="success-notification">
          <FiCheckCircle color='#3dcc33' size={75} />
          <span>Cadastro concluído!</span>
        </div>
      ) : ''}
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta" />

          <Link to="/">
            <FiArrowLeft />
          Voltar para a home
        </Link>
        </header>

        <form onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="name">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecionne o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
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
                    <option key={uf.id} value={uf.initial}>{uf.initial}</option>
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
                  disabled={selectedUf === '0'}
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
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map(item => (
                <li
                  key={item.id}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  onClick={() => handleSelectItem(item.id)}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </div>
    </>
  );
}

export default CreatePoint;