import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useGetTreeQuery, useUpdateTreeMutation } from './services'
import { Tree, TreeElement } from './interfaces/tree';
import TagView from './Components/TagView';
import { v4 as uuid } from 'uuid';

function App() {
  const { data, isLoading: isLoadingTreeData } = useGetTreeQuery();
  const [updateTree] = useUpdateTreeMutation();
  const [treeList, setTreeList] = useState([] as TreeElement[]);

  useEffect(() => {
    if (data?.data.treeList) {
      setTreeList(data.data.treeList);
    }
  }, [data]);

  const treeData = useMemo(() => {
    if (treeList) {
      const buildTree = (tag: TreeElement, data: TreeElement[]): Tree => {
        // Find all children of the current tag
        const children = data
            .filter(item => item.parentId === tag.id)
            .map(child => buildTree(child, data));
    
        // Return the node with its children attached
        return { ...tag, children };
      }
      const rootParent = treeList.find((item) => item.parentId === null) as TreeElement;
      const tree = buildTree(rootParent, treeList);

      return tree;
    }
    
  }, [treeList]) as Tree;

  const handleSubmitAddChild = (name: string, data: string, parentId: string) => {
    let currentTree = treeList;
    // Update data node to null for given parent id
    currentTree = currentTree.map((item) => {
      if (item.id === parentId) {
        return { ...item, data: null }
      } else return item
    });
    const newTag = { id: uuid(), name, data, parentId };
    currentTree.push(newTag);

    setTreeList(currentTree);
  };

  const handleTagEdit = (value: string, id: string, field: string) => {
    let currentTree = treeList;
    // Update data node to null for given parent id
    currentTree = currentTree.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value }
      } else return item
    });
    setTreeList(currentTree);
  }

  const handleExportClick = () => {
    const transformToPayloadObject = (tree: Tree): Tree => {
      const { name, data = null, children = [] } = tree;
      const newObj = {
        name,
        data,
        // If present, transform children tags recursivelt
        children: (children && children.length > 0)
          ? children.map(child => transformToPayloadObject(child))
          : []
      } as Tree;
    
      return newObj;
    }

    const payload = transformToPayloadObject(treeData);
    try {
      updateTree(JSON.stringify(payload, null, 2));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {data && !isLoadingTreeData && (
        <TagView
          item={treeData}
          level={0}
          handleSubmit={handleSubmitAddChild}
          handleEdit={handleTagEdit}
        />
      )}
      <button className='bg-grey py-0 mt-4' onClick={() => handleExportClick()}>Export</button>
    </>
  )
}

export default App
