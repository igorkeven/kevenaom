import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, UploadCloud, Map as MapIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Define o tipo para os dados que virão do Supabase
type ReplayWithUploader = {
  id: number;
  created_at: string;
  map_name: string | null;
  version: string | null;
  file_path: string;
  uploader: {
    username: string | null;
  } | null;
};

const ReplaysPage = () => {
  const { user } = useAuth();
  const [replays, setReplays] = useState<ReplayWithUploader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplays = async () => {
      try {
        const { data, error } = await supabase
          .from('replays')
          .select('id, created_at, map_name, version, file_path, uploader:profiles(username)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReplays(data as unknown as ReplayWithUploader[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReplays();
  }, []);

  return (
    <section id="replays" className="py-20 pt-32 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-4">
              <MapIcon className="w-5 h-5 text-primary" />
              <span className="font-cinzel text-sm text-primary font-semibold tracking-wide">
                ARQUIVO DE BATALHAS
              </span>
            </div>
            <h1 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground">
              Replays da Comunidade
            </h1>
          </div>
          {user ? (
            <Button asChild variant="divine" size="lg" className="mt-4 sm:mt-0 group">
              <Link to="/dashboard">
                <UploadCloud className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Enviar seu Replay
              </Link>
            </Button>
          ) : (
            <AuthModal>
              <Button variant="divine" size="lg" className="mt-4 sm:mt-0 group">
                <UploadCloud className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Enviar seu Replay
              </Button>
            </AuthModal>
          )}
        </div>

        {/* Replays Table */}
        <Card className="bg-gradient-card border-primary/20 shadow-epic overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/10">
                <TableHead className="font-cinzel text-primary">Mapa</TableHead>
                <TableHead className="font-cinzel text-primary">Uploader</TableHead>
                <TableHead className="font-cinzel text-primary text-center">Versão</TableHead>
                <TableHead className="font-cinzel text-primary text-center">Enviado em</TableHead>
                <TableHead className="font-cinzel text-primary text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 font-inter">Carregando replays...</TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-red-500 font-inter">Erro ao carregar: {error}</TableCell>
                </TableRow>
              )}
              {!loading && !error && replays.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 font-inter">Nenhum replay encontrado.</TableCell>
                </TableRow>
              )}
              {!loading && !error && replays.map((replay) => {
                const publicURL = supabase.storage.from('replays').getPublicUrl(replay.file_path).data.publicUrl;
                return (
                  <TableRow key={replay.id} className="border-primary/10 hover:bg-primary/5">
                    <TableCell className="font-inter font-semibold text-foreground">{replay.map_name || 'Desconhecido'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-inter text-foreground">{replay.uploader?.username || 'Anônimo'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-inter text-muted-foreground text-center">{replay.version || 'N/A'}</TableCell>
                    <TableCell className="font-inter text-muted-foreground text-center">
                      {formatDistanceToNow(new Date(replay.created_at), { addSuffix: true, locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={publicURL} download>
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};

export default ReplaysPage;

