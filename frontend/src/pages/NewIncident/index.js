import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import api from "../../services/api";
import "./style.css";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handlerNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post("/incidents", data, {
        headers: {
          authorization: ongId,
        },
      });
      history.push("/profiles");
    } catch (error) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }

  return (
    <>
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente e encontre um herói para
              resolve-lo.
            </p>

            <Link className="back-link" to="/profiles">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar a home
            </Link>
          </section>
          <form onSubmit={handlerNewIncident}>
            <input
              placeholder="Título do caso"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              placeholder="Valor em reais"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
