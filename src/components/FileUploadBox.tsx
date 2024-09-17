import { Button } from "./ui/button";
import { createAlert, setUploadedFile, uploadedFile } from "./shared";
import { parseGraphJSON } from "@/graph-lib/core";


const FileUploadBox = () => {

	// Handler to open file input dialog
	const handleClick = () => {
		document.getElementById("file-input")?.click(); // Trigger click on hidden file input
	};

	// Handler for file input change event
	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const selectedFile = input.files[0];
			if (selectedFile.type === "application/json") {
				setUploadedFile(selectedFile); // Store the selected file if it's a JSON
			} else {
			console.log("file type not supported"); // Log message if not a JSON file
			}
		}
	};

	// Handler for drag over event
	const handleDragOver = (event: DragEvent) => {
		event.preventDefault(); // Prevent default to allow drop
		event.stopPropagation();
	};

	// Handler for drop event
	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
		  const droppedFile = event.dataTransfer.files[0];
		  if (droppedFile.type === "application/json") {
			setUploadedFile(droppedFile);
		  } else {
			createAlert("File type not supported", "Only JSON files are supported.");
			console.log("file type not supported");
		  }
		}
	};

	return (
		<Button 
			class="flex h-[150px] w-full items-center justify-center rounded-md border-2 border-dashed text-sm bg-transparent text-slate-500"
			onClick={handleClick}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			>
			<input
				type="file"
				id="file-input"
				accept=".json"
				class="hidden"
				onChange={handleFileChange}
			/>
			{uploadedFile() ? <p>{uploadedFile()?.name}</p> : <p>Upload JSON file</p>}
		</Button>
	);
};

export default FileUploadBox;