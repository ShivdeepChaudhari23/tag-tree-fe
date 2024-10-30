import { useState } from "react";
import { TagViewProps } from "../interfaces/tree";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function TagView ({ item, level = 0, handleSubmit, handleEdit }: TagViewProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [isDialogOpen, toggleDialog] = useState(false);
    const [isEditingTagName, setIsEditingTagName] = useState(false);
    const [newChildConfig, setNewChildConfig] = useState({ name: '', data: '' });

    const toggleCollapse = () => {
      setIsOpen(!isOpen);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChildConfig((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    return (
    <>
        <div className="w-full border border-collapseBackground mb-1">
        <div className={`h-8 mt-1 w-full bg-collapseBackground flex justify-between p-4 items-center`}>
            <div className="flex items-center">
                <button className="my-4 mr-4 !p-0 rounded-lg bg-grey" onClick={toggleCollapse}>{`${isOpen ? '▼' : '▶'}`}</button>
                {isEditingTagName ? (
                    <input
                        value={item.name}
                        onChange={(e) => handleEdit(e.target.value, item.id, 'name')}
                        onBlur={() => setIsEditingTagName(false)}
                    />
                    ) :
                    <div onClick={() => setIsEditingTagName(true)}>{item.name}</div>}
            </div>
            <button className="h-6 !p-0 bg-grey" onClick={() => toggleDialog(true)}>Add Child</button>
        </div>
        {(isOpen && item.children && item.children.length > 0 &&
          <div className={`ml-5 !ml-${4*(level+1)}`}>
            {item.children.map((child) => (
              <TagView
                key={child.id}
                item={child}
                level={level+1}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                />
            ))}
          </div>
        )}
        {(isOpen && item.data && (
            <div className="flex pl-2">
                <label>Data:</label>
                <input
                    value={item.data as string}
                    onChange={(e) => handleEdit(e.target.value, item.id, 'data')}
                >

                </input>
            </div>
        ))}
      </div>
      {
        <Dialog
        open={isDialogOpen}
        onClose={() => toggleDialog(false)}
    >
        <DialogTitle className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold">{'Add Child'}</h3>
            <div onClick={() => toggleDialog(false)}>x</div>
        </DialogTitle>
        <DialogContent className="flex justify-between items-center">
            <div className="flex flex-col">
                <div>
                    <label className="pr-4">Name:</label>
                    <input
                        type="string"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        value={newChildConfig.name}
                    />
                </div>
                <div>
                    <label className="pr-4">Data:</label>
                    <input
                        type="string"
                        name="data"
                        onChange={(e) => handleChange(e)}
                        value={newChildConfig.data}
                    />
                </div>
            </div>
        </DialogContent>
        <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => toggleDialog(false)}
                    className="!normal-case"
                >
                    Cancel
                </Button>
            <Button
                variant="contained"
                disabled={false}
                className="!normal-case"
                onClick={() => {
                    handleSubmit(newChildConfig.name, newChildConfig.data, item.id);
                    toggleDialog(false);
                }}
            >
                Add
            </Button>
        </DialogActions>
    </Dialog>
      }
    </>
    );
};

export default TagView;