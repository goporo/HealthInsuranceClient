import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouterConfig';
import axios from '../../config/axios';
import UiButton from 'components/common/ui/UiButton/UiButton';
import UiModal from 'components/common/ui/UiModal/UiModal';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await axios.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const changeDir = (dir) => {
    navigate(dir);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    console.log("closed!");
  }


  return (
    <div className=''>
      <UiModal visible={isModalVisible} onConfirm={handleCloseModal} onclose={handleCloseModal} onCancel={handleCloseModal} headerTitle="Modal Title">Test modal</UiModal>
      <div className="text-xl text-[red]">
        <div className="bg-slate-300">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.createdAt}</td>
                  <td className="py-2 px-4 border-b">{user.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        className={`bg-[#3498db] p-[10px] text-[white] rounded-md hover:bg-[red] hover:text-[#3498db]`}
        onClick={() => {
          changeDir(ROUTES.About);
        }}
      >
        Go To About
      </button>
      <UiButton className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => { setIsModalVisible(!isModalVisible) }}
      >
        show modal
      </UiButton>
    </div>
  );
};

export default Home;
