import { T_AUDIO, T_EXCEL, T_FOLDER, T_IMAGE, T_PDF, T_PPT, T_VIEDO, T_WORD, T_ZIP } from '@/constant/global';
import Icons from '../ui/Icon';

const IconCustoms = ({ type }: any) => {
    switch (type) {
        case T_PDF:
          return <Icons icon="mdi:file-pdf-box" className="w-8 text-xl  text-danger-500" />;
        case T_IMAGE:
          return <Icons icon="mdi:image" className="w-8 text-xl text-danger-500" />;
        case T_VIEDO:
          return <Icons icon="mdi:video-box" className="w-8 text-xl text-danger-500" />;
        case T_FOLDER:
          return <Icons icon="mdi:folder" className="w-8 text-xl text-dark-500" />;
        case T_AUDIO:
          return <Icons icon="mdi:music-box" className="w-8 text-xl text-danger-500" />;
        case T_WORD:
          return <Icons icon="mdi:file-word" className="w-8 text-xl text-blue-500" />;
        case T_EXCEL:
          return <Icons icon="mdi:file-excel" className="w-8 text-xl text-success-600" />;
        case T_PPT:
          return <Icons icon="mdi:file-powerpoint" className="w-8 text-xl text-yellow-500" />;
        case T_ZIP:
          return <Icons icon="mdi:folder-zip" className="w-8 text-xl text-dark-600" />;
        default:
          return <Icons icon="mdi:file-document" className="w-8 text-xl" />;
      }
}

export default IconCustoms