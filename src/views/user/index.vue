<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="昵称" v-model="searchName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->

      <el-table-column label="用户id" width="140" align="center">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.user_nickname }}
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_real_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.user_phone_number }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.user_email }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
        <div id="user_foot" class="user_foot">
					<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
					</el-pagination>
				</div>
  <div>
  <el-dialog :title="form && form.id ? '编辑' : '添加' " :visible.sync="formVisible" :close-on-click-modal="false">
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="用户id" prop="user_id">
        <el-input v-model="form.user_id" />
      </el-form-item>
            <el-form-item label="昵称" prop="user_nickname">
        <el-input v-model="form.user_nickname" />
      </el-form-item>
                  <el-form-item label="真实姓名" prop="user_real_name">
        <el-input v-model="form.user_real_name" />
      </el-form-item>
                  <el-form-item label="手机号" prop="user_phone_number">
        <el-input v-model="form.user_phone_number" />
      </el-form-item>
                  <el-form-item label="邮箱" prop="user_email">
        <el-input v-model="form.user_email" />
      </el-form-item>
      <!-- <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="formVisible = false">取消</el-button>
      <el-button type="primary" @click.native="addOrUpdate" :loading="formLoading">提交</el-button>
    </div>
  </el-dialog>
  </div>
  </div>
</template>

<script>
import { listUser } from '@/axios/api'
import { addUser } from '@/axios/api'
import { deleteUser } from '@/axios/api'
import { updateUser} from  '@/axios/api'
import { searchUser } from '@/axios/api'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchName: '',
      flag : 0,
      list: null,
      listLoading: true ,
      form : {},
      updateform:{},
      size : 20,
      filters : {},
      formLoading: false,
      formVisible: false,
      total : 0,
      currentPage : 1,
      pageSize : 20,
      listQuery: {},
      rows : {},
      clientHeight : '100%',
      rules : {
        user_id: [{
        required: true,
        message: '请输入ID',
        trigger: 'blur'
      }],
  // sex: [{
  //   required: true,
  //   message: '请选择性别',
  //   trigger: 'change'
  // }]
},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.listQuery = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      listUser(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.data.total
        this.currentPage++
        console.log('555555')
        console.log(this.list)
        this.listLoading = false
      })
    },
    addData() {
      this.formLoading = true
      addUser(this.form).then(response => {
        console.log('retret')
        console.log(response)
        this.formLoading = false
        if (!response.data) {
          
          this.$message({
            showClose: true,
            message: 'error',
            type: 'error'
          })
          return
        }
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.currentPage = 1
        this.fetchData()
        this.formVisible = false
      })
    },
    handleAdd() {
      this.flag = 1
      console.log("1111111")
  this.form = {}
  // this.form.sex = 1
  this.formVisible = true      
    },
    handleDownload() {
      
    },
    handleFilter() {
      searchUser(this.searchName).then(res => {
        if (!res.data) {
          this.$message({
            type: 'error',
            message: '用户昵称不存在!'
          })
          return 
        } 
        this.list = [res.data]
        // this.currentPage = 1
        // this.fetchData()
      })
    },
    downloadLoading() {
      
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除数据，是否继续？','提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type : 'warning'

      }).then(() => {
        // console.log('delete在这')
        this.listLoading = true
        deleteUser(row.user_id).then(res =>{
          // console.log('delete在这2')
          this.listLoading = false
          if(!res.data){
            this.$message({
              type : 'error',
              message : 'error!'
            })
            return
          }
          this.$message({
            type : 'success',
            message : row.user_nickname+'   删除成功！'
          })
            this.currentPage = 1
          this.fetchData()
        })
        
      })

    },
    handleEdit(index,row){
      this.flag = 2
      this.form = Object.assign({},row)
      this.formVisible = true
    },
    handleCurrentChange(val) {
				this.currentPage = val
				this.fetchData()
      },
     addOrUpdate() {
      if (this.flag === 1) {
        this.addData()
        this.flag = 0
      } else if (this.flag === 2) {
        this.updateData()
        this.flag = 0
      } else {
        return
      }
    },
    updateData() {
      this.formLoading = true
      updateUser(this.form).then(response => {
        console.log('retret')
        console.log(response)
        this.formLoading = false
        if (!response.data) {
          this.$message({
            showClose: true,
            message: 'error',
            type: 'error'
          })
          return
        }
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        this.currentPage = 1
        this.fetchData()
        this.formVisible = false
      })
    },
  },

}
</script>

<style scoped>
  .filter-container {
    margin-bottom: 20px
  }
</style>
