"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type State = {
  nome: string;
  sigla: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState<State[]>([])

  // fetch dos estados
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => response.json())
      .then(data => setState(data))
  }, [])


  // filtrar os etados por nome ou sigla
  const filteredStates = search.length > 0
    ? state.filter(state => state.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      state.sigla.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ).slice(0, 5) : [];

  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center justify-end space-x-2">
        <Search className="w-6 h-6" />
        <Input
          className="w-50"
          placeholder="Search for a State in Brazil"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {search.length > 0 && (
        <div className="flex items-center justify-center">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">State</TableHead>
                <TableHead>Sigla</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStates.map((state) => (
                <TableRow key={state.sigla}>
                  <TableCell className="font-medium">{state.nome}</TableCell>
                  <TableCell>{state.sigla}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
