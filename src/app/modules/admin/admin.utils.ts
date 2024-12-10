import { User } from "../user/user.model";

const findLastAdmin = async () => {
    const lastAdmin = await User.findOne(
      {
        role: 'admin',
      },
      {
        id: 1,
        _id: 0,
      },
    ).sort({id: -1}).lean();
    return lastAdmin?.id.substring(2) || undefined;
  };

  export const generateAdminId = async () => {
     let currentId = (0).toString();
    const lastAdminId = await findLastAdmin();
    
     currentId = lastAdminId ? lastAdminId.substring(2) : '0000'; 
    
    let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId ;
  };