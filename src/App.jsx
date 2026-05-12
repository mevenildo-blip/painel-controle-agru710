import { useState } from "react";

const initialMembers = [
  { id: 1, nome: "João Silva", secao: "Lobitos", idade: 10, email: "joao@mail.com", quota: "paga", valor: 30 },
  { id: 2, nome: "Maria Santos", secao: "Exploradores", idade: 14, email: "maria@mail.com", quota: "paga", valor: 30 },
  { id: 3, nome: "Pedro Costa", secao: "Pioneiros", idade: 17, email: "pedro@mail.com", quota: "pendente", valor: 30 },
  { id: 4, nome: "Ana Ferreira", secao: "Lobitos", idade: 9, email: "ana@mail.com", quota: "paga", valor: 30 },
  { id: 5, nome: "Rui Oliveira", secao: "Exploradores", idade: 13, email: "rui@mail.com", quota: "pendente", valor: 30 },
  { id: 6, nome: "Sofia Lopes", secao: "Caminheiros", idade: 19, email: "sofia@mail.com", quota: "paga", valor: 30 },
];

const initialMovimentos = [
  { id: 1, descricao: "Quotas Março", tipo: "entrada", valor: 120, data: "2026-03-01" },
  { id: 2, descricao: "Material campismo", tipo: "saida", valor: 85, data: "2026-03-10" },
  { id: 3, descricao: "Quotas Abril", tipo: "entrada", valor: 90, data: "2026-04-01" },
  { id: 4, descricao: "Transporte acampamento", tipo: "saida", valor: 200, data: "2026-04-15" },
  { id: 5, descricao: "Subsídio Junta", tipo: "entrada", valor: 500, data: "2026-05-01" },
  { id: 6, descricao: "Fardamentos", tipo: "saida", valor: 150, data: "2026-05-05" },
];

const secoes = ["Todas", "Lobitos", "Exploradores", "Pioneiros", "Caminheiros"];
const secaoCores = {
  Lobitos: "#f59e0b",
  Exploradores: "#10b981",
  Pioneiros: "#3b82f6",
  Caminheiros: "#8b5cf6",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Pro:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Crimson Pro', Georgia, serif;
    background-color: #1a1a0e;
    color: #e8d5a3;
  }

  .app {
    min-height: 100vh;
    background-color: #1a1a0e;
    background-image:
      radial-gradient(ellipse at 20% 20%, rgba(74,60,20,0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(30,50,20,0.5) 0%, transparent 50%);
  }

  .sidebar {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: 240px;
    background: linear-gradient(180deg, #2d2408 0%, #1a1a0e 100%);
    border-right: 1px solid rgba(184,134,11,0.2);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(184,134,11,0.15);
    text-align: center;
  }

  .fleur { font-size: 36px; display: block; margin-bottom: 8px; }

  .sidebar-logo h1 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: #d4a017;
    letter-spacing: 0.05em;
    line-height: 1.3;
  }

  .sidebar-logo p {
    font-size: 11px;
    color: #8a7a50;
    margin-top: 4px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .nav {
    flex: 1;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    font-size: 14px;
    font-family: 'Crimson Pro', serif;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #8a7a50;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: rgba(184,134,11,0.08); color: #d4a017; }
  .nav-item.active {
    background: rgba(184,134,11,0.15);
    border-color: rgba(184,134,11,0.3);
    color: #d4a017;
  }

  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(184,134,11,0.15);
    font-size: 11px;
    color: #4a3f20;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .main {
    margin-left: 240px;
    padding: 32px 36px;
    min-height: 100vh;
  }

  .page-header {
    margin-bottom: 32px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 900;
    color: #d4a017;
    line-height: 1;
  }

  .page-subtitle { font-size: 14px; color: #6b5d35; margin-top: 6px; letter-spacing: 0.05em; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Crimson Pro', serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    transition: all 0.2s;
  }

  .btn-primary {
    background: linear-gradient(135deg, #b8860b, #d4a017);
    color: #1a1a0e;
  }
  .btn-primary:hover {
    background: linear-gradient(135deg, #d4a017, #f0c040);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(212,160,23,0.3);
  }

  .btn-ghost {
    background: transparent;
    color: #8a7a50;
    border: 1px solid rgba(184,134,11,0.2);
  }
  .btn-ghost:hover { border-color: rgba(184,134,11,0.5); color: #d4a017; }

  .btn-danger {
    background: rgba(180,50,50,0.15);
    color: #e07070;
    border: 1px solid rgba(180,50,50,0.2);
  }
  .btn-danger:hover { background: rgba(180,50,50,0.25); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: linear-gradient(135deg, rgba(45,36,8,0.8), rgba(30,28,10,0.9));
    border: 1px solid rgba(184,134,11,0.2);
    border-radius: 12px;
    padding: 20px;
    transition: border-color 0.2s;
  }
  .stat-card:hover { border-color: rgba(184,134,11,0.4); }

  .stat-icon { font-size: 24px; margin-bottom: 12px; }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #d4a017;
    line-height: 1;
  }
  .stat-label { font-size: 12px; color: #6b5d35; margin-top: 4px; letter-spacing: 0.08em; text-transform: uppercase; }
  .stat-sub { font-size: 12px; color: #4a7a4a; margin-top: 8px; }

  .card {
    background: rgba(30,26,8,0.7);
    border: 1px solid rgba(184,134,11,0.15);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .card-header {
    padding: 18px 24px;
    border-bottom: 1px solid rgba(184,134,11,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #c9a227;
  }

  .filters { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

  .filter-btn {
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid rgba(184,134,11,0.2);
    background: transparent;
    color: #6b5d35;
    font-family: 'Crimson Pro', serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn.active, .filter-btn:hover {
    background: rgba(184,134,11,0.15);
    border-color: rgba(184,134,11,0.4);
    color: #d4a017;
  }

  .search-input {
    background: rgba(45,36,8,0.5);
    border: 1px solid rgba(184,134,11,0.2);
    border-radius: 6px;
    padding: 7px 14px;
    color: #e8d5a3;
    font-family: 'Crimson Pro', serif;
    font-size: 14px;
    outline: none;
    width: 180px;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: rgba(184,134,11,0.5); }
  .search-input::placeholder { color: #4a3f20; }

  .select-input {
    background: rgba(45,36,8,0.5);
    border: 1px solid rgba(184,134,11,0.2);
    border-radius: 6px;
    padding: 7px 14px;
    color: #e8d5a3;
    font-family: 'Crimson Pro', serif;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }

  table { width: 100%; border-collapse: collapse; }
  thead tr { background: rgba(45,36,8,0.5); }
  th {
    padding: 12px 20px;
    text-align: left;
    font-size: 11px;
    font-family: 'Crimson Pro', serif;
    font-weight: 600;
    color: #6b5d35;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  td {
    padding: 13px 20px;
    font-size: 14px;
    border-bottom: 1px solid rgba(184,134,11,0.06);
  }
  tr:hover td { background: rgba(184,134,11,0.04); }
  tr:last-child td { border-bottom: none; }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .badge-paga { background: rgba(20,100,40,0.2); color: #5abf7a; border: 1px solid rgba(20,100,40,0.3); }
  .badge-pendente { background: rgba(180,100,0,0.2); color: #e0a040; border: 1px solid rgba(180,100,0,0.3); }
  .badge-entrada { background: rgba(20,100,40,0.2); color: #5abf7a; border: 1px solid rgba(20,100,40,0.3); }
  .badge-saida { background: rgba(150,30,30,0.2); color: #e07070; border: 1px solid rgba(150,30,30,0.3); }

  .secao-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
  }
  .secao-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .actions { display: flex; gap: 6px; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10,10,5,0.8);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: linear-gradient(135deg, #2d2408, #1e1c0a);
    border: 1px solid rgba(184,134,11,0.3);
    border-radius: 16px;
    padding: 32px;
    width: 480px;
    max-width: 90vw;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #d4a017;
    margin-bottom: 24px;
  }

  .form-group { margin-bottom: 16px; }

  .form-label {
    display: block;
    font-size: 12px;
    color: #6b5d35;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 6px;
  }

  .form-input {
    width: 100%;
    background: rgba(45,36,8,0.6);
    border: 1px solid rgba(184,134,11,0.25);
    border-radius: 6px;
    padding: 10px 14px;
    color: #e8d5a3;
    font-family: 'Crimson Pro', serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: rgba(184,134,11,0.6); }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .finance-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
  }

  .saldo-card {
    background: linear-gradient(135deg, #2d3d1a, #1a2a10);
    border: 1px solid rgba(80,140,50,0.3);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    margin-bottom: 20px;
  }

  .saldo-valor {
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    font-weight: 900;
    color: #6abf5e;
    text-shadow: 0 0 20px rgba(100,180,80,0.3);
  }

  .saldo-label {
    font-size: 13px;
    color: #5a7a40;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-top: 4px;
  }

  .saldo-row {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 16px;
  }

  .saldo-col { text-align: center; }

  .saldo-num {
    font-size: 20px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }

  .saldo-sub {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .quotas-resumo {
    background: rgba(30,26,8,0.7);
    border: 1px solid rgba(184,134,11,0.15);
    border-radius: 12px;
    padding: 20px;
  }

  .quotas-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: #c9a227;
    margin-bottom: 16px;
  }

  .quotas-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(184,134,11,0.08);
    font-size: 14px;
  }
  .quotas-item:last-child { border-bottom: none; }

  .pendente-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(184,134,11,0.06);
    font-size: 13px;
    align-items: center;
  }

  .secoes-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 20px 24px;
  }

  .secao-card {
    text-align: center;
    padding: 16px;
    background: rgba(45,36,8,0.4);
    border-radius: 10px;
  }

  .secao-count {
    font-size: 28px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    line-height: 1;
  }

  .secao-name { font-size: 13px; color: #8a7a50; margin-top: 4px; }

  .secao-bar-bg {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    margin-top: 10px;
  }

  .secao-bar-fill { height: 100%; border-radius: 2px; }

  .valor-pos { color: #5abf7a; }
  .valor-neg { color: #e07070; }

  .divider {
    width: 1px;
    background: rgba(184,134,11,0.15);
  }

  .empty-row td {
    text-align: center;
    color: #4a3f20;
    padding: 30px;
  }
`;

export default function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [membros, setMembros] = useState(initialMembers);
  const [movimentos, setMovimentos] = useState(initialMovimentos);
  const [secaoFiltro, setSecaoFiltro] = useState("Todas");
  const [quotaFiltro, setQuotaFiltro] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMembro, setModalMembro] = useState(false);
  const [modalMovimento, setModalMovimento] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyMembro = { nome: "", secao: "Lobitos", idade: "", email: "", quota: "pendente", valor: 30 };
  const emptyMov = { descricao: "", tipo: "entrada", valor: "", data: new Date().toISOString().split("T")[0] };

  const [novoMembro, setNovoMembro] = useState(emptyMembro);
  const [novoMov, setNovoMov] = useState(emptyMov);

  const membrosFiltrados = membros.filter(m => {
    if (secaoFiltro !== "Todas" && m.secao !== secaoFiltro) return false;
    if (quotaFiltro !== "todas" && m.quota !== quotaFiltro) return false;
    if (!m.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalEntradas = movimentos.filter(m => m.tipo === "entrada").reduce((s, m) => s + m.valor, 0);
  const totalSaidas = movimentos.filter(m => m.tipo === "saida").reduce((s, m) => s + m.valor, 0);
  const saldo = totalEntradas - totalSaidas;
  const quotasPagas = membros.filter(m => m.quota === "paga").length;
  const quotasPendentes = membros.filter(m => m.quota === "pendente").length;
  const secaoCount = (s) => membros.filter(m => m.secao === s).length;

  function salvarMembro() {
    if (!novoMembro.nome.trim()) return;
    if (editId) {
      setMembros(membros.map(m => m.id === editId ? { ...novoMembro, id: editId } : m));
    } else {
      setMembros([...membros, { ...novoMembro, id: Date.now() }]);
    }
    setModalMembro(false);
    setEditId(null);
    setNovoMembro(emptyMembro);
  }

  function abrirEditar(m) {
    setNovoMembro({ ...m });
    setEditId(m.id);
    setModalMembro(true);
  }

  function abrirNovo() {
    setNovoMembro(emptyMembro);
    setEditId(null);
    setModalMembro(true);
  }

  function removerMembro(id) {
    if (window.confirm("Tens a certeza que queres remover este membro?")) {
      setMembros(membros.filter(m => m.id !== id));
    }
  }

  function toggleQuota(id) {
    setMembros(membros.map(m =>
      m.id === id ? { ...m, quota: m.quota === "paga" ? "pendente" : "paga" } : m
    ));
  }

  function salvarMovimento() {
    if (!novoMov.descricao.trim() || !novoMov.valor) return;
    setMovimentos([...movimentos, { ...novoMov, id: Date.now(), valor: parseFloat(novoMov.valor) }]);
    setModalMovimento(false);
    setNovoMov(emptyMov);
  }

  function removerMovimento(id) {
    setMovimentos(movimentos.filter(m => m.id !== id));
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="fleur">⚜️</span>
            <h1>Agrupamento<br />de Escuteiros</h1>
            <p>Painel de Controlo</p>
          </div>
          <nav className="nav">
            {[
              { id: "dashboard", icon: "🏕️", label: "Início" },
              { id: "membros",   icon: "👥", label: "Membros" },
              { id: "financas",  icon: "💰", label: "Finanças" },
            ].map(item => (
              <button
                key={item.id}
                className={`nav-item${pagina === item.id ? " active" : ""}`}
                onClick={() => setPagina(item.id)}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">Sempre Alerta · {new Date().getFullYear()}</div>
        </aside>

        {/* ── Main ── */}
        <main className="main">

          {/* ─── DASHBOARD ─── */}
          {pagina === "dashboard" && (
            <>
              <div className="page-header">
                <div>
                  <div className="page-title">Bom dia, Chefe! ⚜️</div>
                  <div className="page-subtitle">Resumo geral do agrupamento</div>
                </div>
              </div>

              <div className="stats-grid">
                {[
                  { icon: "👥", value: membros.length, label: "Membros", sub: `${secaoCount("Lobitos")} Lobitos · ${secaoCount("Exploradores")} Expl.` },
                  { icon: "✅", value: quotasPagas, label: "Quotas Pagas", sub: `⚠ ${quotasPendentes} pendentes`, subColor: "#e0a040" },
                  { icon: "💶", value: `${saldo}€`, label: "Saldo Atual", sub: `Receitas: ${totalEntradas}€` },
                  { icon: "📋", value: movimentos.length, label: "Movimentos", sub: `Despesas: ${totalSaidas}€` },
                ].map((s, i) => (
                  <div className="stat-card" key={i}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-sub" style={s.subColor ? { color: s.subColor } : {}}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="card-header"><span className="card-title">Distribuição por Secção</span></div>
                <div className="secoes-grid">
                  {["Lobitos","Exploradores","Pioneiros","Caminheiros"].map(s => (
                    <div className="secao-card" key={s} style={{ border: `1px solid ${secaoCores[s]}30` }}>
                      <div className="secao-count" style={{ color: secaoCores[s] }}>{secaoCount(s)}</div>
                      <div className="secao-name">{s}</div>
                      <div className="secao-bar-bg">
                        <div
                          className="secao-bar-fill"
                          style={{ width: `${membros.length ? (secaoCount(s) / membros.length) * 100 : 0}%`, background: secaoCores[s] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">Últimos Movimentos</span>
                  <button className="btn btn-ghost btn-sm" onClick={() => setPagina("financas")}>Ver todos →</button>
                </div>
                <table>
                  <thead><tr><th>Descrição</th><th>Tipo</th><th>Data</th><th>Valor</th></tr></thead>
                  <tbody>
                    {[...movimentos].reverse().slice(0, 4).map(m => (
                      <tr key={m.id}>
                        <td>{m.descricao}</td>
                        <td><span className={`badge badge-${m.tipo}`}>{m.tipo === "entrada" ? "Receita" : "Despesa"}</span></td>
                        <td style={{ color: "#6b5d35" }}>{new Date(m.data).toLocaleDateString("pt-PT")}</td>
                        <td className={m.tipo === "entrada" ? "valor-pos" : "valor-neg"} style={{ fontWeight: 600 }}>
                          {m.tipo === "entrada" ? "+" : "-"}{m.valor}€
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ─── MEMBROS ─── */}
          {pagina === "membros" && (
            <>
              <div className="page-header">
                <div>
                  <div className="page-title">Membros</div>
                  <div className="page-subtitle">{membros.length} escuteiros registados</div>
                </div>
                <button className="btn btn-primary" onClick={abrirNovo}>+ Novo Membro</button>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="filters">
                    {secoes.map(s => (
                      <button key={s} className={`filter-btn${secaoFiltro === s ? " active" : ""}`} onClick={() => setSecaoFiltro(s)}>{s}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select className="select-input" value={quotaFiltro} onChange={e => setQuotaFiltro(e.target.value)}>
                      <option value="todas">Todas as quotas</option>
                      <option value="paga">Paga</option>
                      <option value="pendente">Pendente</option>
                    </select>
                    <input className="search-input" placeholder="Pesquisar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr><th>Nome</th><th>Secção</th><th>Idade</th><th>Email</th><th>Quota</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {membrosFiltrados.length === 0 && (
                      <tr className="empty-row"><td colSpan={6}>Nenhum membro encontrado</td></tr>
                    )}
                    {membrosFiltrados.map(m => (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 600, color: "#e8d5a3" }}>{m.nome}</td>
                        <td>
                          <span className="secao-pill">
                            <span className="secao-dot" style={{ background: secaoCores[m.secao] }} />
                            {m.secao}
                          </span>
                        </td>
                        <td style={{ color: "#8a7a50" }}>{m.idade} anos</td>
                        <td style={{ color: "#6b5d35", fontSize: "13px" }}>{m.email}</td>
                        <td>
                          <span
                            className={`badge badge-${m.quota}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleQuota(m.id)}
                            title="Clica para alternar"
                          >
                            {m.quota === "paga" ? "✓ Paga" : "⏳ Pendente"}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="btn btn-ghost btn-sm" onClick={() => abrirEditar(m)}>✏️</button>
                            <button className="btn btn-danger btn-sm" onClick={() => removerMembro(m.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ─── FINANÇAS ─── */}
          {pagina === "financas" && (
            <>
              <div className="page-header">
                <div>
                  <div className="page-title">Finanças</div>
                  <div className="page-subtitle">Controlo de receitas e despesas</div>
                </div>
                <button className="btn btn-primary" onClick={() => setModalMovimento(true)}>+ Novo Movimento</button>
              </div>

              <div className="finance-grid">
                <div>
                  <div className="saldo-card">
                    <div className="saldo-valor">{saldo}€</div>
                    <div className="saldo-label">Saldo Disponível</div>
                    <div className="saldo-row">
                      <div className="saldo-col">
                        <div className="saldo-num valor-pos">+{totalEntradas}€</div>
                        <div className="saldo-sub" style={{ color: "#4a7a4a" }}>Receitas</div>
                      </div>
                      <div className="divider" />
                      <div className="saldo-col">
                        <div className="saldo-num valor-neg">-{totalSaidas}€</div>
                        <div className="saldo-sub" style={{ color: "#7a4a4a" }}>Despesas</div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header"><span className="card-title">Histórico de Movimentos</span></div>
                    <table>
                      <thead><tr><th>Descrição</th><th>Tipo</th><th>Data</th><th>Valor</th><th></th></tr></thead>
                      <tbody>
                        {[...movimentos].reverse().map(m => (
                          <tr key={m.id}>
                            <td>{m.descricao}</td>
                            <td><span className={`badge badge-${m.tipo}`}>{m.tipo === "entrada" ? "Receita" : "Despesa"}</span></td>
                            <td style={{ color: "#6b5d35" }}>{new Date(m.data).toLocaleDateString("pt-PT")}</td>
                            <td className={m.tipo === "entrada" ? "valor-pos" : "valor-neg"} style={{ fontWeight: 600 }}>
                              {m.tipo === "entrada" ? "+" : "-"}{m.valor}€
                            </td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => removerMovimento(m.id)}>🗑</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="quotas-resumo">
                    <div className="quotas-title">Estado das Quotas</div>
                    {[
                      { label: "Total de membros", value: membros.length, color: "#e8d5a3" },
                      { label: "Quotas pagas", value: quotasPagas, color: "#5abf7a" },
                      { label: "Quotas pendentes", value: quotasPendentes, color: "#e0a040" },
                      { label: "Valor recebido", value: `${quotasPagas * 30}€`, color: "#5abf7a" },
                      { label: "Valor em falta", value: `${quotasPendentes * 30}€`, color: "#e07070" },
                    ].map((row, i) => (
                      <div className="quotas-item" key={i}>
                        <span>{row.label}</span>
                        <span style={{ color: row.color, fontWeight: 600 }}>{row.value}</span>
                      </div>
                    ))}

                    <div style={{ marginTop: "20px", fontFamily: "'Playfair Display',serif", fontSize: "14px", color: "#6b5d35", marginBottom: "10px" }}>
                      Com quotas pendentes:
                    </div>
                    {membros.filter(m => m.quota === "pendente").map(m => (
                      <div className="pendente-row" key={m.id}>
                        <span>{m.nome}</span>
                        <button className="btn btn-ghost btn-sm" onClick={() => toggleQuota(m.id)} style={{ fontSize: "11px", padding: "3px 8px" }}>
                          Marcar paga
                        </button>
                      </div>
                    ))}
                    {quotasPendentes === 0 && (
                      <div style={{ textAlign: "center", color: "#4a7a4a", padding: "12px", fontSize: "13px" }}>
                        ✓ Todas as quotas em dia!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        {/* ── Modal Membro ── */}
        {modalMembro && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalMembro(false)}>
            <div className="modal">
              <div className="modal-title">{editId ? "Editar Membro" : "Novo Membro"}</div>
              <div className="form-group">
                <label className="form-label">Nome completo</label>
                <input className="form-input" value={novoMembro.nome} onChange={e => setNovoMembro({ ...novoMembro, nome: e.target.value })} placeholder="Nome do escuteiro" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Secção</label>
                  <select className="form-input" value={novoMembro.secao} onChange={e => setNovoMembro({ ...novoMembro, secao: e.target.value })}>
                    {["Lobitos","Exploradores","Pioneiros","Caminheiros"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Idade</label>
                  <input className="form-input" type="number" value={novoMembro.idade} onChange={e => setNovoMembro({ ...novoMembro, idade: e.target.value })} placeholder="Ex: 12" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={novoMembro.email} onChange={e => setNovoMembro({ ...novoMembro, email: e.target.value })} placeholder="email@exemplo.com" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Estado da Quota</label>
                  <select className="form-input" value={novoMembro.quota} onChange={e => setNovoMembro({ ...novoMembro, quota: e.target.value })}>
                    <option value="paga">Paga</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Valor (€)</label>
                  <input className="form-input" type="number" value={novoMembro.valor} onChange={e => setNovoMembro({ ...novoMembro, valor: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setModalMembro(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={salvarMembro}>
                  {editId ? "Guardar alterações" : "Adicionar membro"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Modal Movimento ── */}
        {modalMovimento && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModalMovimento(false)}>
            <div className="modal">
              <div className="modal-title">Novo Movimento</div>
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <input className="form-input" value={novoMov.descricao} onChange={e => setNovoMov({ ...novoMov, descricao: e.target.value })} placeholder="Ex: Quotas de Maio" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select className="form-input" value={novoMov.tipo} onChange={e => setNovoMov({ ...novoMov, tipo: e.target.value })}>
                    <option value="entrada">Receita</option>
                    <option value="saida">Despesa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Valor (€)</label>
                  <input className="form-input" type="number" value={novoMov.valor} onChange={e => setNovoMov({ ...novoMov, valor: e.target.value })} placeholder="0.00" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Data</label>
                <input className="form-input" type="date" value={novoMov.data} onChange={e => setNovoMov({ ...novoMov, data: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setModalMovimento(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={salvarMovimento}>Registar movimento</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
