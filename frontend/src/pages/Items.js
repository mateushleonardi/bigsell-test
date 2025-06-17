import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import React,{ useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';

function Items() {
  const { items, fetchItems, totalPages } = useData();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetchItems(controller.signal, page).catch(console.error);
    return () => controller.abort();
  }, [fetchItems, page]);

  if (!items.length) return <p>Loading...</p>;

  // Component to render each line of the list
  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div style={style}>
        <Link to={`/items/${item.id}`}>{item.name}</Link>
      </div>
    );
  };
 
  // return (
  //   <div>
  //     <List
  //       height={400}         // Container height
  //       itemCount={items.length}
  //       itemSize={40}        // Height of each item
  //       width="100%"        
  //     >
  //       {Row}
  //     </List>

  //     {/* Pagination */}
  //     <div style={{ marginTop: '1rem' }}>
  //       <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
  //         Previous
  //       </button>
  //       <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
  //       <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );

    return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <List>
        {items.map(item => (
          <ListItem key={item.id} component={Link} to={`/items/${item.id}`} button>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>

      <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button variant="contained" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Previous
        </Button>
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <Button variant="contained" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );

}

export default Items;