import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { UploadCloud } from 'lucide-react';

interface UploadReplayModalProps {
  children: React.ReactNode;
}

export const UploadReplayModal = ({ children }: UploadReplayModalProps) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [mapName, setMapName] = useState('');
  const [version, setVersion] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileParse = async (replayFile: File) => {
    setIsParsing(true);
    setError(null);
    try {
      // --- PONTO DE INTEGRAÇÃO FUTURA COM O BACKEND ---
      // 1. Criar um FormData para enviar o arquivo
      // const formData = new FormData();
      // formData.append('replay', replayFile);
      //
      // 2. Fazer a chamada para a API do seu backend
      // const response = await fetch('URL_DA_SUA_API_DE_PARSING', {
      //   method: 'POST',
      //   body: formData,
      // });
      // if (!response.ok) throw new Error('Falha na análise do servidor.');
      // const parsedData = await response.json();
      //
      // 3. Usar os dados recebidos
      // setMapName(parsedData.map_name);
      // setVersion(parsedData.version);
      // setDuration(parsedData.duration);
      // ----------------------------------------------------

      // Por enquanto, usamos a simulação:
      console.log(`Simulando análise do replay: ${replayFile.name}`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula a latência da rede
      const mockParsedData = { map_name: "Tundra", version: "1.0.5", duration: "25:47" };
      setMapName(mockParsedData.map_name);
      setVersion(mockParsedData.version);
      setDuration(mockParsedData.duration);

    } catch (err) {
      setError("Falha ao analisar o replay. Tente novamente.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      handleFileParse(selectedFile);
    }
  };

  const resetState = () => {
    setFile(null);
    setMapName('');
    setVersion('');
    setDuration('');
    setLoading(false);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) {
      setError('Arquivo não selecionado ou usuário não autenticado.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const filePath = `public/${user.id}/${Date.now()}-${file.name}`;

      // 1. Upload do arquivo para o Storage
      const { error: uploadError } = await supabase.storage
        .from('replays')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Inserir metadados no banco de dados
      const { error: dbError } = await supabase
        .from('replays')
        .insert({
          uploader_id: user.id,
          file_path: filePath,
          map_name: mapName,
          version: version,
          duration: duration,
          // Adicione outros campos como versão, duração, etc.
        });

      if (dbError) throw dbError;

      setSuccess('Replay enviado com sucesso!');
      setTimeout(resetState, 2000);

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao enviar o replay.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && resetState()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-card border-primary/20 shadow-epic">
        <DialogHeader>
          <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Enviar Replay</DialogTitle>
          <DialogDescription className="text-center font-inter text-muted-foreground">
            Compartilhe sua batalha com a comunidade.
          </DialogDescription>
        </DialogHeader>
        <form id="upload-form" onSubmit={handleUpload} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="replay-file">Arquivo do Replay (.rec)</Label>
            <Input id="replay-file" type="file" onChange={handleFileChange} required accept=".rec,.age3yrec" />
          </div>
          {isParsing && <p className="text-sm text-primary text-center animate-pulse">Analisando replay...</p>}
          
          <div className="grid gap-2">
            <Label htmlFor="map-name">Nome do Mapa</Label>
            <Input id="map-name" value={mapName} onChange={(e) => setMapName(e.target.value)} placeholder="Preenchido automaticamente..." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="version">Versão</Label>
              <Input id="version" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Auto..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duração</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Auto..." />
            </div>
          </div>
        </form>
        <DialogFooter className="flex flex-col gap-2">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
          <Button type="submit" form="upload-form" variant="divine" size="lg" className="w-full" disabled={loading || isParsing}>
            {loading ? 'Enviando...' : isParsing ? 'Analisando...' : <><UploadCloud className="w-4 h-4 mr-2" /> Enviar</> }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};