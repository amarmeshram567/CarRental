import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '', 
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)
      if (data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }



  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title='Add New Car' subTitle='Fill in details to list a new car for booking, including pricing, availability, and car specifications.' />

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} className='h-14 rounded cursor-pointer' alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} id='car-image' type="file" accept='image/*' hidden />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        {/* Car brand & model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" onChange={(e)=> setCar({...car, brand: e.target.value})} value={car.brand} placeholder='e.g. BMW, Mercedes, Audi...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md' />
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" onChange={(e)=> setCar({...car, model: e.target.value})} value={car.model} placeholder='e.g. BMW, X5, E-Class, M4...' required className='px-3 py-2 mt-1 border border-borderColor rounded-md' />
          </div>
        </div>

        {/* Car year, price, category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" onChange={(e)=> setCar({...car, year: e.target.value})} value={car.year} placeholder='2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md' />
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type="number" onChange={(e)=> setCar({...car, pricePerDay: e.target.value})} value={car.pricePerDay} placeholder='100' required className='px-3 py-2 mt-1 border border-borderColor rounded-md' />
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={(e) => setCar({...car, category: e.target.value})} value={car.category}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">VAN</option>
            </select>
          </div>
        </div>

        {/* Car transmission, fuel type, seating capacity */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
           <div className='flex flex-col w-full'>
            <label>Transmission</label>
            <select onChange={(e) => setCar({...car, transmission: e.target.value})} value={car.transmission}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select onChange={(e) => setCar({...car, fuel_type: e.target.value})} value={car.fuel_type}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input type="number" onChange={(e)=> setCar({...car, seating_capacity: e.target.value})} value={car.seating_capacity} placeholder='4' required className='px-3 py-2 mt-1 border border-borderColor rounded-md' />
          </div>
        </div>

        {/* Car Location */}
        <div className='flex flex-col w-full'>
          <label>Location</label>
            <select onChange={(e) => setCar({...car, location: e.target.value})} value={car.location}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
        </div>

        {/* Car description */}
        <div className='flex flex-col w-full'>
            <label>Description</label>
            <textarea rows={5} onChange={(e)=> setCar({...car, description: e.target.value})} value={car.description} placeholder='e.g. A luxurious SUV with a spacious interior and a powerful engine.' required className='px-3 py-2 mt-1 border border-borderColor rounded-md'></textarea>
          </div>   

          <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
            <img src={assets.tick_icon} alt="" />
            {isLoading ? 'Listing...' : 'List Your Car'}
          </button>     

      </form>
    </div>
  );
}

export default AddCar;
