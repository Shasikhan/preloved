import React, { useState, useContext } from "react";
import { StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import * as Yup from "yup";
import { getTime, set } from 'date-fns'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";
import { AuthContext } from '../api/AuthProvider';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, 'Please select atleast one image'),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  //const location = useLocation([]);
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit2 = async (values, { resetForm }) => {
    const selectedImg = values.images[0];
    const selectedCategory = values.category['label'];
    const enteredPrice = values.price;
    const enteredtitle = values.title;
    const enteredDesc = values.description;

    console.log(selectedImg);

    const imageUrl = await uploadImage(selectedImg);
    
    const currentTime = getTime(set(new Date(), { hours: 0, minutes: 0, seconds:0, milliseconds: 0 }));

    firestore()
    .collection('lists')
    .add({
      userId: user.uid,
      listTitle: enteredtitle,
      listImg: imageUrl,
      listPrice: enteredPrice,
      listCategory: selectedCategory,
      listDesc: enteredDesc,
      listTime: firestore.Timestamp.fromDate(new Date()),
      listTime2: currentTime,
    })
    .then(() => {
      resetForm();
      console.log('List Added!');
      Alert.alert(
        'List published!',
        'Your list has been added Successfully!',
      );
      setImage(null);
    })
    .catch((error) => {
      console.log('Something went wrong while adding list to firestore.', error);
    });
      
  }

  const uploadImage = async (selectedImage) => {
    // if(image == null) {
    //   return null;
    // }

    const uploadUri = selectedImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploadVisible(true);
    setProgress(0);
    
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setProgress( taskSnapshot.bytesTransferred / taskSnapshot.totalBytes );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploadVisible(false);
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }
  }
  



  // const handleSubmit = async (listing, { resetForm }) => {

  //   setProgress(0);
  //   setUploadVisible(true);
  //   const result = await listingsApi.addListing(
  //     //{ ...listing, location},
  //     (progress) => setProgress(progress),
  //   );


  //   if (!result.ok) {
  //     setUploadVisible(false);
  //     return alert('Could not save the data.');
  //   }
   
  //   resetForm();
  // };

  return (
    <ScrollView>
    <Screen style={styles.container}>
      
      <UploadScreen 
        onDone={() => setUploadVisible(false)} 
        progress={progress} 
        visible={uploadVisible} 
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={(values, resetForm) => handleSubmit2(values, resetForm)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name='images' />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  kS: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
export default ListingEditScreen;
