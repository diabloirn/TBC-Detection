import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
import numpy as np

DATASET_DIR = "dataset"
IMG_SIZE = 224
BATCH_SIZE = 16
EPOCHS = 10

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True,
    fill_mode='nearest',
    preprocessing_function=lambda x: x  # Pastikan input RGB
)

print("Checking dataset structure...")
if not os.path.exists(DATASET_DIR):
    print(f"Error: Dataset directory '{DATASET_DIR}' not found!")
    print("Please create the following structure:")
    print("dataset/")
    print("├── tuberculosis/")
    print("└── normal/")
    exit()

subdirs = [d for d in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, d))]
print(f"Found subdirectories: {subdirs}")

if len(subdirs) != 2:
    print("Error: Dataset should have exactly 2 subdirectories (tuberculosis and normal)")
    exit()

train_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='training',
    color_mode='rgb' 
)

val_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='binary',
    subset='validation',
    color_mode='rgb' 
)

print(f"Training samples: {train_gen.samples}")
print(f"Validation samples: {val_gen.samples}")
print(f"Classes: {train_gen.class_indices}")

# Alternatif: Gunakan model yang lebih sederhana jika EfficientNet error

base_model = EfficientNetB0(
    weights='imagenet', 
    include_top=False, 
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)
print("Using pretrained EfficientNetB0")
base_model.trainable = False



x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
output = Dense(1, activation='sigmoid')(x)
model = Model(inputs=base_model.input, outputs=output)

model.compile(
    optimizer=Adam(learning_rate=1e-4), 
    loss='binary_crossentropy', 
    metrics=['accuracy']
)

print("Model architecture:")
model.summary()


print("Starting training...")
history = model.fit(
    train_gen,
    epochs=EPOCHS,
    validation_data=val_gen,
    verbose=1
)

os.makedirs('model', exist_ok=True)
model.save('model/efficientnet_tb.h5')
print('Model saved to model/efficientnet_tb.h5')


final_train_acc = history.history['accuracy'][-1]
final_val_acc = history.history['val_accuracy'][-1]
print(f"Final Training Accuracy: {final_train_acc:.4f}")
print(f"Final Validation Accuracy: {final_val_acc:.4f}")