import { useState } from 'react';

/**
 * Custom hook for form validation with Zod
 * @param {object} schema - Zod schema for validation
 * @param {function} onSubmit - Callback when form is valid
 * @returns {object} form state and handlers
 */
export const useForm = (schema, onSubmit) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data against schema
      const validatedData = schema.parse(formData);
      
      // Call the onSubmit callback with validated data
      await onSubmit(validatedData);
    } catch (error) {
      // Collect all validation errors
      const newErrors = {};
      if (error.errors) {
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      }
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
