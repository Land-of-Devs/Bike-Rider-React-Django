import { Avatar, Table, TableBody, TableCell, TableRow } from "@mui/material";

const ClientView = ({client}) => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Avatar sx={{width: 100, height: 100, alignSelf: 'center' }} src={client.image ? `/api/data/${client.image||""}` : ''} />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><b>DNI: </b></TableCell>
              <TableCell>{client.dni}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>Email: </b></TableCell>
              <TableCell>{client.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};


export default ClientView;
