"use client"

import api from "@/api/api"
import HeadPage from "@/app/head"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Fileinput from "@/components/ui/Fileinput"
import { url } from "@/constant/url"
import { DocumentProvider } from "@/contexts/DocumentContext"
import { errorManagemet, getParamsPath } from "@/utils/GlobalFunction"
import { closeToast, showToast } from "@/utils/ToastFunction"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Blank = () => {
  const router = useRouter();
  const [path, setPath] = useState('')
  const [isDirectory, setIsDirectory] = useState<any>(false)

  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const handleFileChangeMultiple = (e: any) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles(filesArray);
  };

  useEffect(() => {
    setPath(getParamsPath('path'))
    setIsDirectory(getParamsPath('dir'))
  }, [])

  const back = () => {
    if (path == '') {
      router.push('/my-drive')
    } else {
      router.push('/my-drive/folders/' + path)
    }
  }

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    showToast('loading');
    setLoading(true)
    try {
      api.post(url.document.upload, {
        path: path,
        files: selectedFiles
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      }).then((response) => {
        closeToast();
        showToast('success', 'Successfully')
        setLoading(false)

        back();
      })
        .catch(() => {
          closeToast();
          showToast('error', 'Upload error')
          setLoading(false)
        });
    } catch (errorx: any) {
      const message = await errorManagemet(errorx);
      closeToast();
      showToast('error', message.toString())
      setLoading(false)
    }
  }

  return (
    <DocumentProvider>
      <HeadPage title="Uploads" />
      <Button text="Back" icon="heroicons-outline:arrow-left" className="btn-outline-dark btn-sm mb-3" onClick={back} />
      <Card noborder>
        <Fileinput
          name="basic"
          multiple
          selectedFiles={selectedFiles}
          disabled={loading}
          onChange={handleFileChangeMultiple}
        />
        {
          loading && (
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div className="bg-green-600 h-2.5 rounded-full dark:bg-gray-300" style={{
                width: progress + 'px'
              }} ></div>
            </div>
          )
        }
        <Button text="Submit" className="btn-dark btn-sm mt-3" onClick={handleSubmit} disabled={loading} />
      </Card>
    </DocumentProvider>
  )
}

export default Blank;