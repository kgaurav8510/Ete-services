import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface EmployeeState {
  isLoading: boolean;
  employees: {
    id: string;
    fullName: string;
    email: string;
    age: number;
    country: string;
    profilePicture: string;
  }[];
  error: boolean;
}

const initialState: EmployeeState = {
  isLoading: false,
  employees: [],
  error: false,
};

export const getEmployeeAction = createAsyncThunk(
  "employees/getEmployees",
  async (_: void, thunkAPI) => {
    const response: any = await fetch(
      `http://localhost:4000/api/user/getUser`
    ).then((res) => res.json());
    if (response.data) return response.data;
    return thunkAPI.rejectWithValue(response);
  }
);

export const createEmployeeAction = createAsyncThunk(
  "employees/createEmployees",
  async (employeeData: any, thunkAPI) => {
    const response: any = await fetch(
      "http://localhost:4000/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      }
    ).then((res) => res.json());
    if (response.data) return response.data;
    return thunkAPI.rejectWithValue(response);
  }
);

export const editEmployeeAction = createAsyncThunk(
  "employees/editEmployees",
  async (updatedEmployee: any, thunkAPI) => {
    const response: any = await fetch(
      "http://localhost:4000/api/user/updateUser",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      }
    ).then((res) => res.json());
    if (response.data) return response.data;
    return thunkAPI.rejectWithValue(response);
  }
);

export const deleteEmployeeAction = createAsyncThunk(
  "employees/deleteEmployees",
  async (employeeId: string, thunkAPI) => {
    const response: any = await fetch(
      `http://localhost:4000/api/user/delete/${employeeId}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());
    if (response.data) return response.data;
    return thunkAPI.rejectWithValue(response);
  }
);

export const employeeSlice: any = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeAction.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.isLoading = false;
      })
      .addCase(getEmployeeAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
    builder
      .addCase(createEmployeeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployeeAction.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createEmployeeAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
    builder
      .addCase(editEmployeeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEmployeeAction.fulfilled, (state, action) => {
        state.employees = [
          ...state.employees.map((employee) => {
            if (employee?.id === action.payload.id) {
              return action.payload;
            } else {
              return employee;
            }
          }),
        ];
        state.isLoading = false;
      })
      .addCase(editEmployeeAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
    builder
      .addCase(deleteEmployeeAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeAction.fulfilled, (state, action) => {
        const employeeIndex = state.employees.findIndex(
          (el: any) => el.id === action.payload.id
        );
        state.employees.splice(employeeIndex, 1);
        state.isLoading = false;
      })
      .addCase(deleteEmployeeAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default employeeSlice.reducer;
