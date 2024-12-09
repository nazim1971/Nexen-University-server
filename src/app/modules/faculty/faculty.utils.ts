import { User } from "../user/user.model";

const findLastFaculty = async () => {
    const lastFaculty = await User.findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    ).sort({id: -1}).lean();
    return lastFaculty?.id.substring(2) || undefined;
  };

  export const generateFacultyId = async () => {
     let currentId = (0).toString();
    const lastFacultyId = await findLastFaculty();
    
     currentId = lastFacultyId ? lastFacultyId.substring(2) : '0000'; 
    
    let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
    incrementId = `F-${incrementId}`;
    return incrementId ;
  };