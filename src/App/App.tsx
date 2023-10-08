import './App.style.scss';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { Table } from '../components/Table';
import { tableData } from '../config';

export function App() {

  return (
    <div className="app">
      <Header />
      <main className="main">
        <SideBar />
        <Table tableData={tableData} />
      </main>
    </div>
  );
}
