import { useQuery } from 'react-query';
import { obtenerTemas } from '@/queries/foro';

export default function useTemas(TemaId) {
  const { data, isLoading } = useQuery(['get-foros'], () => obtenerTemas());
  
  if(!data){
    return {isLoading}
  }
  console.log('TemaId', TemaId)
  console.log('data', data.data.data)
  const tema = data.data.data.find((item) => item.id == TemaId);  
  console.log('tema', tema)
  return {isLoading, tema};
}